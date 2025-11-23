import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { hashPassword, generateVerificationToken, generateResetToken, setPasswordResetToken } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
    // Initialize Stripe and Supabase inside handler to avoid build-time errors
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-12-18.acacia' as any,
    });

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                console.log('=== CHECKOUT SESSION COMPLETED ===');
                console.log('Session ID:', session.id);
                console.log('Customer Email:', session.customer_details?.email);
                console.log('Customer Name:', session.metadata?.full_name);

                if (!session.customer_details?.email) {
                    console.error('No customer email in session');
                    break;
                }

                // Retrieve the subscription details
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

                console.log('Subscription ID:', subscription.id);
                console.log('Subscription Status:', subscription.status);

                // Check if user already exists
                let { data: user } = await supabase
                    .from('users')
                    .select('id, email')
                    .eq('email', session.customer_details.email)
                    .single();

                // If user doesn't exist, create account automatically
                if (!user) {
                    console.log('User not found - creating new account');

                    // Generate random password (user can reset it later)
                    const randomPassword = crypto.randomUUID();
                    const password_hash = await hashPassword(randomPassword);
                    const email_verification_token = generateVerificationToken();

                    // Split full name into first and last name
                    const fullName = session.metadata?.full_name || session.customer_details.name || '';
                    const nameParts = fullName.trim().split(' ');
                    const first_name = nameParts[0] || 'Client';
                    const last_name = nameParts.slice(1).join(' ') || 'Antreprenor';

                    // Create user
                    const { data: newUser, error: createError } = await supabase
                        .from('users')
                        .insert({
                            email: session.customer_details.email,
                            password_hash,
                            first_name,
                            last_name,
                            email_verification_token,
                            stripe_customer_id: session.customer as string,
                            email_verified: true, // Auto-verify since they paid
                        })
                        .select()
                        .single();

                    if (createError || !newUser) {
                        console.error('Error creating user:', createError);
                        break;
                    }

                    user = newUser;

                    // Log successful user creation
                    console.log('✅ New user created:', newUser.id);

                    // Generate password reset token for welcome email
                    const resetToken = generateResetToken();
                    await setPasswordResetToken(newUser.id, resetToken);

                    // Send welcome email with password setup link
                    const emailResult = await sendWelcomeEmail({
                        email: newUser.email,
                        firstName: newUser.first_name,
                        lastName: newUser.last_name,
                        resetToken,
                    });

                    if (emailResult.success) {
                        console.log('✅ Welcome email sent to:', newUser.email);
                    } else {
                        console.error('❌ Failed to send welcome email:', emailResult.error);
                    }
                } else {
                    console.log('User exists:', user.id);

                    // Update customer_id if missing
                    await supabase.from('users').update({
                        stripe_customer_id: session.customer as string
                    }).eq('id', user.id);
                }

                // Verify user exists before creating subscription
                if (!user) {
                    console.error('No user found after account creation/lookup');
                    break;
                }

                // Create/update subscription in DB
                const { error: subError } = await supabase.from('subscriptions').upsert({
                    user_id: user.id,
                    stripe_subscription_id: subscription.id,
                    stripe_price_id: (subscription as any).items.data[0].price.id,
                    status: subscription.status,
                    current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    cancel_at_period_end: (subscription as any).cancel_at_period_end,
                });

                if (subError) {
                    console.error('Error creating subscription:', subError);
                } else {
                    console.log('✅ Subscription created/updated');
                }

                // --- MAILERLITE SEGMENTATION START ---
                const ML_API_KEY = process.env.MAILERLITE_API_KEY;
                const ML_CLIENT_GROUP_ID = process.env.MAILERLITE_CLIENT_GROUP_ID;

                if (ML_API_KEY && ML_CLIENT_GROUP_ID && session.customer_details?.email) {
                    try {
                        // Add subscriber to "Client" group
                        await fetch('https://connect.mailerlite.com/api/subscribers', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${ML_API_KEY}`,
                            },
                            body: JSON.stringify({
                                email: session.customer_details.email,
                                groups: [ML_CLIENT_GROUP_ID]
                            }),
                        });
                        console.log(`✅ User ${session.customer_details.email} added to MailerLite Client Group.`);
                    } catch (mlError) {
                        console.error('MailerLite Segmentation Error:', mlError);
                    }
                }
                // --- MAILERLITE SEGMENTATION END ---

                console.log('=================================');
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as any;
                const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

                console.log('=== INVOICE PAYMENT SUCCEEDED ===');
                console.log('Invoice ID:', invoice.id);
                console.log('Customer ID:', invoice.customer);

                // Find user by customer_id
                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_customer_id', invoice.customer as string)
                    .single();

                if (user) {
                    await supabase.from('subscriptions').upsert({
                        user_id: user.id,
                        stripe_subscription_id: subscription.id,
                        stripe_price_id: (subscription as any).items.data[0].price.id,
                        status: subscription.status,
                        current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                        cancel_at_period_end: (subscription as any).cancel_at_period_end,
                    });
                    console.log('✅ Subscription updated for user:', user.id);
                } else {
                    console.log('⚠️  User not found for customer:', invoice.customer);
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;

                console.log('=== SUBSCRIPTION UPDATED ===');
                console.log('Subscription ID:', subscription.id);
                console.log('Status:', subscription.status);

                // Find user by customer_id
                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_customer_id', subscription.customer as string)
                    .single();

                if (user) {
                    await supabase.from('subscriptions').upsert({
                        user_id: user.id,
                        stripe_subscription_id: subscription.id,
                        stripe_price_id: (subscription as any).items.data[0].price.id,
                        status: subscription.status,
                        current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                        cancel_at_period_end: (subscription as any).cancel_at_period_end,
                    });
                    console.log('✅ Subscription updated for user:', user.id);
                } else {
                    console.log('⚠️  User not found for customer:', subscription.customer);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;

                console.log('=== SUBSCRIPTION DELETED ===');
                console.log('Subscription ID:', subscription.id);

                // Find user by customer_id
                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_customer_id', subscription.customer as string)
                    .single();

                if (user) {
                    // Mark subscription as canceled
                    await supabase.from('subscriptions').update({
                        status: 'canceled',
                    }).eq('stripe_subscription_id', subscription.id);
                    console.log('✅ Subscription marked as canceled for user:', user.id);
                }
                break;
            }
        }
    } catch (error: any) {
        console.error(`Error processing webhook: ${error.message}`);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
