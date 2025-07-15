import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
    const client = await clientPromise;
    const blog = await client
        .db()
        .collection('blogs')
        .aggregate([
            { $match: { _id: new ObjectId(id) } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            { $unwind: '$category' },
        ])
        .next();

    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const {id} = await context.params;
    const body = await req.json();
    const {
        title,
        content,
        imageUrl,
        tags,
        author,
        categoryId,
    } = body;

    const client = await clientPromise;
    const result = await client.db().collection('blogs').updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title,
                content,
                imageUrl,
                tags,
                author,
                categoryId: new ObjectId(categoryId),
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
    const result = await client
        .db()
        .collection('blogs')
        .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(result);
}
