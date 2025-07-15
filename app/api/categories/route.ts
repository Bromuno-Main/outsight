import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    const client = await clientPromise;
    const categories = await client.db().collection('categories').find().toArray();
    return NextResponse.json(categories);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { name } = body;

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const client = await clientPromise;
    const result = await client.db().collection('categories').insertOne({ name });

    return NextResponse.json(result);
}
