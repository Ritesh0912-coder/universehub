import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email coordinates' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await db.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json(
                { message: 'Transmission redundant. You are already in the fleet.' },
                { status: 200 }
            );
        }

        // Save to Database
        await db.subscriber.create({
            data: { email }
        });

        return NextResponse.json({
            success: true,
            message: 'Transmission received! Welcome to the fleet.'
        });
    } catch (error: any) {
        console.error('Subscription API Error:', error);
        return NextResponse.json(
            { error: 'Atmospheric interference. Failed to transmit email.' },
            { status: 500 }
        );
    }
}
