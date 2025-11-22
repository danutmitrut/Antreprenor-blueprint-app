import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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

                // Retrieve the subscription details
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

                // Upsert user (in case they don't exist yet, though handle_new_user trigger usually handles auth users)
                // Here we mainly want to ensure the stripe_customer_id is set
                // Note: Linking to Auth user is tricky if we don't have the User ID. 
                // In our flow, we rely on the email match or the client-side flow to link.
                // But for subscription status, we can store it by customer_id if needed, 
                // or try to find the user by email.

                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', session.customer_details?.email)
                    .single();

                if (user) {
                    // Update subscription in DB
                    await supabase.from('subscriptions').upsert({
                        id: subscription.id,
                        user_id: user.id,
                        status: subscription.status,
                        plan_id: (subscription as any).items.data[0].price.id,
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    });

                    // Update customer_id on user if missing
                    await supabase.from('users').update({
                        stripe_customer_id: session.customer as string
                    }).eq('id', user.id);

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
                            console.log(`User ${session.customer_details.email} added to MailerLite Client Group.`);
                        } catch (mlError) {
                            console.error('MailerLite Segmentation Error:', mlError);
                        }
                    }
                    // --- MAILERLITE SEGMENTATION END ---
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as any; // Cast to any to access subscription
                const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

                // Find user by customer_id
                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_customer_id', invoice.customer as string)
                    .single();

                if (user) {
                    await supabase.from('subscriptions').upsert({
                        id: subscription.id,
                        user_id: user.id,
                        status: subscription.status,
                        plan_id: (subscription as any).items.data[0].price.id,
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    });
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                // Find user by customer_id
                const { data: user } = await supabase
                    .from('users')
                    .select('id')
                    .eq('stripe_customer_id', subscription.customer as string)
                    .single();

                if (user) {
                    await supabase.from('subscriptions').upsert({
                        id: subscription.id,
                        user_id: user.id,
                        status: subscription.status,
                        plan_id: (subscription as any).items.data[0].price.id,
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    });
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
