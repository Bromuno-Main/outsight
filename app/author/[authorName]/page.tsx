"use client";
import React from 'react'
import {notFound, useParams} from "next/navigation";
import {collections, posts} from "@/app/data/posts";
import AuthorProfileClient from "@/app/author/[authorName]/AuthorProfileClient";

interface AuthorProfile {
    name: string;
    bio: string;
    profilePicture: string;
    joinDate: string;
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



export default function Page() {
    const params = useParams<{ authorName:string }>();
    console.log(params);

    const authorNameDecoded = decodeURIComponent(params.authorName);
    const authorProfile = getAuthorProfile(authorNameDecoded);

    if (!authorProfile) {
        notFound();
    }

    const authorPosts = posts.filter(post => post.author === authorNameDecoded);
    const authorCollections = collections.filter(collection =>
        collection.postIndices.some(postIndex => {
            const post = posts.find(p => p.index === postIndex);
            return post?.author === authorNameDecoded;
        })
    );

    return (
        <AuthorProfileClient
            authorProfile={authorProfile}
            authorPosts={authorPosts}
            authorCollections={authorCollections}
        />
    )
}
