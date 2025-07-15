import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    const client = await clientPromise;
    const db = client.db();

    const [blogsCount, categoriesCount, collectionsCount] = await Promise.all([
        db.collection('blogs').countDocuments(),
        db.collection('categories').countDocuments(),
        db.collection('collections').countDocuments()
    ]);

    return NextResponse.json({
        blogsCount,
        categoriesCount,
        collectionsCount
    });
}
