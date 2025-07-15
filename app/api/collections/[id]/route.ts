import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;

    const client = await clientPromise;
    const collection = await client.db().collection('collections')
        .aggregate([
            { $match: { _id: new ObjectId(id) } },
            {
                $lookup: {
                    from: 'blogs',
                    localField: 'blogIds',
                    foreignField: '_id',
                    as: 'blogs',
                },
            }
        ])
        .next();

    if (!collection) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(collection);
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
    const body = await req.json();
    const { title, description, blogIds, imageUrl } = body;

    const client = await clientPromise;
    const result = await client.db().collection('collections').updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title,
                description,
                imageUrl,
                blogIds: blogIds.map((id: string) => new ObjectId(id)),
                updatedAt: new Date().toISOString(),
            },
        }
    );

    return NextResponse.json(result);
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
    const client = await clientPromise;
    const result = await client.db().collection('collections').deleteOne({
        _id: new ObjectId(id),
    });

    return NextResponse.json(result);
}
