// app/test-collection-page/page.tsx  <-- TEMPORARY TEST FILE
import React from 'react';
import { posts, collections, Post, Collection } from '@/app/data/posts'; // Adjust path if needed
import Link from 'next/link';
// No notFound needed here for this test page
import { FaRegFileAlt, FaUsers, FaChevronRight } from 'react-icons/fa';
import { PostSmall } from '@/app/components/Post/post';

// No generateMetadata needed for this temporary test page

// The Test Page Component (Server Component)
export default function TestCollectionPage() { // Renamed function, removed params

    // --- Hardcode data for testing ---
    // Find the *first* collection as an example, or create a mock one
    // IMPORTANT: Make sure you actually HAVE collections in your data/posts.ts
    const collection = collections.length > 0 ? collections[0] : null;

    // If no collections exist at all in data, handle gracefully
    if (!collection) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-16 pt-24 min-h-screen text-red-600">
                Error: No collections found in data/posts.ts to display for testing.
                Cannot render test page layout.
            </div>
        );
    }

    // Find all posts belonging to this hardcoded collection
    const postsInCollection = posts.filter(post =>
        collection.postIndices.includes(post.index)
    );

    // Calculate stats
    const postCount = postsInCollection.length;
    const uniqueAuthors = new Set(postsInCollection.map(post => post.author));
    const authorCount = uniqueAuthors.size;
    // --- End hardcoded data ---


    // --- Render the same layout as the original page ---
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16 pt-24 min-h-screen">

            {/* Static Breadcrumbs for testing */}
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
                <ol className="flex items-center space-x-1 md:space-x-2">
                    <li>
                        <Link href="/" className="hover:text-gray-900 hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <FaChevronRight className="h-3 w-3 inline mx-1" />
                    </li>
                    <li aria-current="page">
                        {/* Display the name of the hardcoded collection */}
                        <span className="font-medium text-gray-800">Test Collection: {collection.name}</span>
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
                <h2 className="text-2xl font-semibold mb-6">Articles in this Collection (Test View)</h2>
                {postsInCollection.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {postsInCollection.map((post) => (
                            // Links still point to actual post pages
                            <Link href={`/post/${post.index}`} key={post.index} className="block outline-none focus:outline-none">
                                <PostSmall {...post} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">There are no articles in this test collection ({collection.name}).</p>
                )}
            </section>
            {/* --- End Articles List --- */}

        </div>
    );
}
