// app/author/[authorName]/page.tsx
import React from 'react';
import { posts, collections } from '@/app/data/posts'; // Adjust path if needed
import { notFound } from 'next/navigation';
import AuthorProfileClient from './AuthorProfileClient';

// --- Mock Author Data (Ideally fetch this from a DB or dedicated source) ---
interface AuthorProfile {
    name: string;
    bio: string;
    profilePicture: string; // URL to the image
    joinDate: string; // Example extra info
}

const getAuthorProfile = (authorName: string): AuthorProfile | undefined => {
    const authorExists = posts.some(p => p.author === authorName);
    if (!authorExists) return undefined;

    return {
        name: authorName,
        bio: `Insights and articles by ${authorName}. Exploring topics in technology, design, and the future of the web.`,
        profilePicture: '/default-avatar.png',
        joinDate: 'Joined January 2023',
    };
};
// --- End Mock Author Data ---

// Generate Metadata (MUST be in a server component)
export async function generateMetadata({ params }: { params: { authorName: string } }) {
    const authorNameDecoded = decodeURIComponent(params.authorName);
    const authorProfile = getAuthorProfile(authorNameDecoded);

    if (!authorProfile) {
        return { title: 'Author Not Found' };
    }

    return {
        title: `${authorProfile.name} | Author Profile`,
        description: authorProfile.bio.substring(0, 150) + '...',
    };
}

// Server Component (No "use client")
export default async function AuthorProfilePage({ params }: { params: { authorName: string } }) {
    const authorNameDecoded = decodeURIComponent(params.authorName);
    const authorProfile = getAuthorProfile(authorNameDecoded);

    // Find posts by this author (data fetching remains in the server component)
    const authorPosts = posts.filter(post => post.author === authorNameDecoded);

    // Find collections by this author (data fetching remains in the server component)
    const authorCollections = collections.filter(collection =>
        collection.postIndices.some(postIndex => {
            const post = posts.find(p => p.index === postIndex);
            return post?.author === authorNameDecoded;
        })
    );

    if (!authorProfile) {
        notFound();
    }

    // Pass data as props to the client component
    return (
        <AuthorProfileClient
            authorProfile={authorProfile}
            authorPosts={authorPosts}
            authorCollections={authorCollections}
        />
    );
}
