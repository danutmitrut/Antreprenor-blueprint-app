import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, firstName, lastName, occupation, industry } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const API_KEY = process.env.MAILERLITE_API_KEY;
        const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

        if (!API_KEY || !GROUP_ID) {
            console.error('MailerLite configuration missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // 1. Create or update subscriber
        const subscriberResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                email: email,
                fields: {
                    name: firstName,
                    last_name: lastName
                },
                groups: [GROUP_ID] // Add directly to group
            }),
        });

        if (!subscriberResponse.ok) {
            const errorData = await subscriberResponse.json();
            console.error('MailerLite API Error:', errorData);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: subscriberResponse.status });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
