// app/author/[authorName]/AuthorProfileClient.tsx
'use client'; // This is a client component
import React, { useState } from 'react';
import { Post, Collection } from '@/app/data/posts'; // Adjust path if needed
import Image from 'next/image';
import Link from 'next/link';
import { FaBookOpen, FaLayerGroup, FaChevronRight } from 'react-icons/fa';
import CollectionCard from '@/app/components/collectionCard';
import { PostSmall } from '@/app/components/Post/post';

// Define the props it will receive
interface AuthorProfileClientProps {
    authorProfile: {
        name: string;
        bio: string;
        profilePicture: string;
        joinDate: string;
    };
    authorPosts: Post[];
    authorCollections: Collection[];
}

export default function AuthorProfileClient({ authorProfile, authorPosts, authorCollections }: AuthorProfileClientProps) {
    const [activeTab, setActiveTab] = useState<'articles' | 'collections'>('articles');

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
            <li>
              <FaChevronRight className="h-3 w-3 inline mx-1" />
            </li>
            <li aria-current="page">
              <span className="font-medium text-gray-800">{authorProfile.name}</span>
            </li>
          </ol>
        </nav>
        {/* --- End Breadcrumbs --- */}

        {/* --- Profile Header --- */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12 border-b pb-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={authorProfile.profilePicture}
              alt={`${authorProfile.name}'s profile picture`}
              fill
              className="object-cover"
              priority // Load profile picture faster
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-rajdhani text-3xl md:text-4xl font-bold mb-2">{authorProfile.name}</h1>
            <p className="text-gray-700 mb-3">{authorProfile.bio}</p>
            <p className="text-sm text-gray-500">{authorProfile.joinDate}</p>
            {/* Add social links here if available */}
          </div>
        </header>
        {/* --- End Profile Header --- */}

        {/* --- Tabs --- */}
        <div className="mb-8 border-b">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('articles')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'articles'
                  ? 'border-[#105745] text-[#105745]' // Active tab style
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' // Inactive tab style
              }`}
            >
              <FaBookOpen /> Articles ({authorPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'collections'
                  ? 'border-[#105745] text-[#105745]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaLayerGroup /> Collections ({authorCollections.length})
            </button>
          </nav>
        </div>
        {/* --- End Tabs --- */}

        {/* --- Tab Content --- */}
        <div>
          {activeTab === 'articles' && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 sr-only">Articles by {authorProfile.name}</h2> {/* Screen reader heading */}
              {authorPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* You'll need a PostCard component here */}
                  {authorPosts.map((post,index) => (
                       <PostSmall key={index} {...post} />


                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">This author hasn&#39;t published any articles yet.</p>
              )}
            </section>
          )}

          {activeTab === 'collections' && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 sr-only">Collections featuring {authorProfile.name}</h2> {/* Screen reader heading */}
              {authorCollections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Reuse the CollectionCard component */}
                  {authorCollections.map((collection,index) => (
                    <CollectionCard
                        index={index}
                      key={collection.id}
                      collection={collection}
                      allPosts={authorPosts} // CollectionCard needs all posts to find details
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">This author&#39;s articles are not part of any collections yet.</p>
              )}
            </section>
          )}
        </div>
        {/* --- End Tab Content --- */}

      </div>
    );
}
