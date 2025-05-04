// app/collection/[collectionId]/page.tsx
import React from 'react';
import { posts, collections, Post, Collection } from '@/app/data/posts'; // Adjust path if needed
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaRegFileAlt, FaUsers, FaChevronRight } from 'react-icons/fa'; // Icons for stats
import { PostSmall } from '@/app/components/Post/post'; // Reuse PostSmall component

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { collectionId: string } }) {
    const collection = collections.find(c => c.id === params.collectionId);

    if (!collection) {
        return { title: 'Collection Not Found' };
    }

    return {
        title: `Collection: ${collection.name}`,
        description: collection.description?.substring(0, 150) || `Explore articles in the ${collection.name} collection.`,
    };
}

// The Page Component (Server Component)
export default function CollectionPage({ params }: { params: { collectionId: string } }) {
    const { collectionId } = params;

    // Find the specific collection
    const collection = collections.find(c => c.id === collectionId);

    // If collection doesn't exist, show 404
    if (!collection) {
        notFound();
    }

    // Find all posts belonging to this collection
    const postsInCollection = posts.filter(post =>
        collection.postIndices.includes(post.index)
    );

    // Calculate stats
    const postCount = postsInCollection.length;
    const uniqueAuthors = new Set(postsInCollection.map(post => post.author));
    const authorCount = uniqueAuthors.size;

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16 pt-24 min-h-screen">

            {/* --- Breadcrumbs --- */}
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
                <ol className="flex items-center space-x-1 md:space-x-2">
                    <li>
                        <Link href="/" className="hover:text-gray-900 hover:underline">
                            Home
                        </Link>
                    </li>
                    {/* Optional: Add a link to a general collections page if you create one */}
                    {/*
                    <li>
                        <FaChevronRight className="h-3 w-3 inline mx-1" />
                    </li>
                    <li>
                        <Link href="/collections" className="hover:text-gray-900 hover:underline">
                            Collections
                        </Link>
                    </li>
                    */}
                    <li>
                        <FaChevronRight className="h-3 w-3 inline mx-1" />
                    </li>
                    <li aria-current="page">
                        <span className="font-medium text-gray-800">{collection.name}</span>
                    </li>
                </ol>
            </nav>
            {/* --- End Breadcrumbs --- */}

            {/* --- Collection Header --- */}
            <header className="mb-12 border-b pb-8">
                <h1 className="font-rajdhani text-3xl md:text-4xl font-bold mb-3">{collection.name}</h1>
                {collection.description && (
                    <p className="text-lg text-gray-700 mb-4 max-w-3xl">{collection.description}</p>
                )}
                {/* Stats */}
                <div className="flex items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <FaRegFileAlt />
                        <span>{postCount} {postCount === 1 ? 'Article' : 'Articles'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaUsers />
                        <span>{authorCount} {authorCount === 1 ? 'Author' : 'Authors'}</span>
                    </div>
                </div>
            </header>
            {/* --- End Collection Header --- */}

            {/* --- Articles List --- */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Articles in this Collection</h2>
                {postsInCollection.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {postsInCollection.map((post) => (
                            <Link href={`/post/${post.index}`} key={post.index} className="block outline-none focus:outline-none">
                                <PostSmall {...post} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">There are no articles in this collection yet.</p>
                )}
            </section>
            {/* --- End Articles List --- */}

        </div>
    );
}
