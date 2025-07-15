import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    const client = await clientPromise;
    const collections = await client.db().collection('collections')
        .aggregate([
            {
                $lookup: {
                    from: 'blogs',
                    localField: 'blogIds',
                    foreignField: '_id',
                    as: 'blogs',
                }
            }
        ])
        .toArray();

    return NextResponse.json(collections);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, blogIds, imageUrl } = body;

    if (!title || !Array.isArray(blogIds)) {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const client = await clientPromise;
    const result = await client.db().collection('collections').insertOne({
        title,
        description,
        imageUrl,
        blogIds: blogIds.map((id: string) => new ObjectId(id)),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(result);
}
