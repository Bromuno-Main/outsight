import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
    const body = await req.json();

    const client = await clientPromise;
    const result = await client.db().collection('categories').updateOne(
        { _id: new ObjectId(id) },
        { $set: { name: body.name } }
    );

    return NextResponse.json(result);
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;

    const client = await clientPromise;
    const result = await client.db().collection('categories').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(result);
}
