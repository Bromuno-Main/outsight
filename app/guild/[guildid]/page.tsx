// app/guild/[guildId]/page.tsx
import React from 'react';
import { posts, collections, guilds, Post, Collection, Guild } from '@/app/data/posts'; // Adjust path if needed
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaUsers, FaBookOpen, FaLayerGroup, FaChevronRight, FaTag } from 'react-icons/fa'; // Icons
import { PostSmall } from '@/app/components/Post/post'; // Reuse PostSmall
import CollectionCard from '@/app/components/collectionCard'; // Reuse CollectionCard

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { guildId: string } }) {
    const guild = guilds.find(g => g.id === params.guildId);

    if (!guild) {
        return { title: 'Guild Not Found' };
    }

    return {
        title: `Guild: ${guild.name}`,
        description: guild.description?.substring(0, 150) || `Explore content from the ${guild.name} guild, focusing on ${guild.theme}.`,
    };
}

// The Guild Page Component (Server Component)
export default function GuildPage({ params }: { params: { guildId: string } }) {
    const { guildId } = params;

    // 1. Find the specific guild
    const guild = guilds.find(g => g.id === guildId);

    // If guild doesn't exist, show 404
    if (!guild) {
        notFound();
    }

    // 2. Find all posts written by authors in this guild
    const guildPosts = posts.filter(post =>
        guild.authorNames.includes(post.author)
    );

    // 3. Find all collections that contain at least one post from a guild member
    const guildCollections = collections.filter(collection =>
        collection.postIndices.some(postIndex => {
            const post = posts.find(p => p.index === postIndex);
            // Check if the post exists AND its author is in the guild
            return post && guild.authorNames.includes(post.author);
        })
    );

    // Calculate stats
    const memberCount = guild.authorNames.length;
    const postCount = guildPosts.length;
    const collectionCount = guildCollections.length;

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
                    {/* Optional: Add link to a general guilds page */}
                    {/* <li><FaChevronRight className="h-3 w-3 inline mx-1" /></li>
                    <li><Link href="/guilds" className="hover:text-gray-900 hover:underline">Guilds</Link></li> */}
                    <li><FaChevronRight className="h-3 w-3 inline mx-1" /></li>
                    <li aria-current="page">
                        <span className="font-medium text-gray-800">{guild.name}</span>
                    </li>
                </ol>
            </nav>
            {/* --- End Breadcrumbs --- */}

            {/* --- Guild Header --- */}
            <header className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12 border-b pb-8">
                {guild.profilePicture && (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                            src={guild.profilePicture}
                            alt={`${guild.name} logo`}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="text-center md:text-left flex-1">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#105745] bg-[#AFF4C6] px-3 py-1 rounded-full mb-2">
                        <FaTag /> {guild.theme}
                    </span>
                    <h1 className="font-rajdhani text-3xl md:text-4xl font-bold mb-2">{guild.name}</h1>
                    {guild.description && (
                        <p className="text-gray-700 mb-4">{guild.description}</p>
                    )}
                    {/* Stats */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <FaUsers />
                            <span>{memberCount} {memberCount === 1 ? 'Member' : 'Members'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaBookOpen />
                            <span>{postCount} {postCount === 1 ? 'Post' : 'Posts'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaLayerGroup />
                            <span>{collectionCount} {collectionCount === 1 ? 'Collection' : 'Collections'}</span>
                        </div>
                    </div>
                </div>
            </header>
            {/* --- End Guild Header --- */}

            {/* --- Guild Content Sections --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column (Members) */}
                <aside className="lg:col-span-1">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Guild Members</h2>
                    {guild.authorNames.length > 0 ? (
                        <ul className="space-y-3">
                            {guild.authorNames.map(authorName => (
                                <li key={authorName}>
                                    <Link
                                        href={`/author/${encodeURIComponent(authorName)}`}
                                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        {/* Placeholder Avatar - Replace if you have author images */}
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium">
                                            {authorName.substring(0, 1)}
                                        </div>
                                        <span className="font-medium text-gray-800">{authorName}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No members listed for this guild.</p>
                    )}
                </aside>

                {/* Right Column (Posts & Collections) */}
                <main className="lg:col-span-2 space-y-12">
                    {/* Posts Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Posts by Guild Members</h2>
                        {guildPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {guildPosts.map((post) => (
                                    <Link href={`/post/${post.index}`} key={post.index} className="block outline-none focus:outline-none">
                                        <PostSmall {...post} />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8 bg-gray-50 rounded-md">No posts found from members of this guild yet.</p>
                        )}
                    </section>

                    {/* Collections Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Collections Featuring Guild Content</h2>
                        {guildCollections.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {guildCollections.map((collection) => (
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                        allPosts={posts} // Pass all posts for CollectionCard to function
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8 bg-gray-50 rounded-md">No collections feature content from this guild yet.</p>
                        )}
                    </section>
                </main>
            </div>
            {/* --- End Guild Content Sections --- */}
        </div>
    );
}
