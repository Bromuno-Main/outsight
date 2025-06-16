"use client";
import React from 'react';
import {notFound, useParams} from 'next/navigation'
import {posts} from "@/app/data/posts";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
export default function Page() {
const params = useParams<{ index:string }>();
  console.log(params);

    const postIndex = parseInt(params.index, 10);
    const post = posts.find(p => p.index === postIndex);

    console.log(post);
  if (!post) {
    notFound();
  }

  return (
      <div className="">
        <div className="w-screen py-12 bg-[#105745] z-[1000] relative  ">
          <div className='w-screen sticky top-0 z-10 mx-auto max-w-screen-xl bg-[#105745]  '>
            <img src={'/insights-logo-white.svg'} alt={'Logo'}/>
          </div>
          <div className="flex  mx-auto relative  max-w-screen-xl gap-[5rem] py-6  ">
            <div className='px-6 py-4 '>
              {/* --- Breadcrumbs (remains the same) --- */}
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white flex items-center h-fit ">
                {/* ... breadcrumb content ... */}
              </nav>
              {/* --- End Breadcrumbs --- */}

              {/* Post Header */}
              <h1 className="font-rajdhani text-3xl text-white  mt-12  md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-semibold text-white mb-4 ">
                {/* --- MODIFICATION START --- */}
                <Link href={`/author/${encodeURIComponent(post.author)}`} className="font-medium hover:underline">
                  {post.author}
                </Link>
                {/* --- MODIFICATION END --- */}
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                    <span key={tag} className="text-sm px-3 py-1 bg-white  rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            {/* Post Image (remains the same) */}
            {post.image && (
                <div className="relative w-full aspect-video max-w-sm mb-8 rounded-lg overflow-hidden">
                  <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      className="object-cover"
                      priority
                  />
                </div>
            )}
          </div>
        </div>
        <article className='max-w-screen-md mx-auto px-4 py-16 pt-24 min-h-screen'>
          {/* Post Body Content (remains the same) */}
          <div className="prose prose-lg lg:prose-xl text-xl leading-relaxed max-w-none">
            {parse(post.body)}
          </div>
        </article>
      </div>
  )
}
