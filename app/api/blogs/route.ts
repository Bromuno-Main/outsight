import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    const client = await clientPromise;
    const blogs = await client
        .db()
        .collection('blogs')
        .aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
        ])
        .toArray();

    return NextResponse.json(blogs);
}

export async function POST(req: Request) {
    const body = await req.json();
    const {
        title,
        content,
        imageUrl,
        tags,
        author,
        categoryId,
    } = body;

    if (!title || !content || !author || !categoryId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const result = await client.db().collection('blogs').insertOne({
        title,
        content,
        imageUrl,
        tags,
        author,
        categoryId: new ObjectId(categoryId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(result);
}
