// c:\Users\DELL\Documents\GitHub\insight\app\components\Post\post.tsx
'use client'; // This is a client component
import React from 'react';
import Image from 'next/image';
import { Post } from '@/app/data/posts';
import {useRouter} from "next/navigation";

// ... (Keep PostProps interface) ...
interface PostProps {
    title: string;
    author: string;
    duration: string;
    date: string;
    body: string;
    image?: {
        src: string;
        alt: string;
    };
    isHot?: boolean;
    tags: string[];
    index: number; // Ensure index is part of the props if needed by parent Link
}


// --- PostSmall ---
export const PostSmall: React.FC<Post> = ({ title, author, date, duration, image, index, isHot, tags }) => {

    const router= useRouter();
    return (
        <div onClick={()=>{
            router.push(`/post/${index}`)
        }} key={index}  className="block outline-none focus:outline-none">


        <article className="flex items-start gap-4  p-4 bg-[#F8F1E6] rounded-3xl transition-colors group cursor-pointer">
            {/* Image Section */}
            <div className="relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-200"> {/* Added fallback bg */}
                {isHot && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-md z-10">
                        HOT
                    </span>
                )}
                {image ? (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {/* Optional: Placeholder icon/text if no image */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                {/* Tags */}
                <div className="flex flex-wrap whitespace-nowrap gap-1 mb-2"> {/* Use flex-wrap and smaller gap */}
                    {tags.slice(0, 3).map((tag,index) => ( // Limit tags shown if needed
                        <span key={index} className="text-[.7rem] px-2 py-0.5 bg-black/5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Title */}
                <h5 className="font-semibold mb-2 line-clamp-2 group-hover:text-[#105745] transition-colors">{title}</h5>

                {/* Meta Info (Author, Date, Duration) */}
                <div className="flex items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600 mt-2 flex-wrap"> {/* Adjusted gaps and text size */}
                    {/* --- AUTHOR LINK START --- */}
                    <div
                        className="hover:underline cursor-pointer hover:text-black transition-colors font-medium" // Added font-medium
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/author/${encodeURIComponent(author)}`)
                        }} // Prevent card link navigation
                    >
                        {author}
                    </div>
                    {/* --- AUTHOR LINK END --- */}
                    <span className="hidden sm:inline">•</span> {/* Hide separator on very small screens */}
                    <span>{date}</span>
                    <span className="hidden sm:inline">•</span> {/* Hide separator on very small screens */}
                    <span>{duration}</span>
                </div>
            </div>
        </article>
        </div>  );
};


// --- PostMedium (Keep as is) ---
export const PostMedium: React.FC<Post> = ({ title, author, date, duration, image, index }) => {
    const router= useRouter();
  return (
      <div onClick={()=>{
          router.push(`/post/${index}`)
      }} key={index} className="block outline-none cursor-pointer focus:outline-none">

    <article className="flex gap-8 items-center group p-6 max-w-screen-sm hover:bg-[#F8F1E6] rounded-3xl"> {/* Added group for potential hover effects */}
      {image && (
         <div className="relative w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
         </div>
      )}
      <div className="flex-1">
        <h3 className="font-semibold mb-1 group-hover:text-[#105745] transition-colors">{title}</h3> {/* Example hover */}

          <div
              key={index}
            className="hover:underline text-sm text-gray-600 cursor-pointer hover:text-black transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/author/${encodeURIComponent(author)}`);
            }}
          >
            {author}
          </div>
           • <span>{date}</span> • <span>{duration}</span>

      </div>
    </article>
      </div>
  );
};

// --- PostLarge (Keep as is) ---
export const PostLarge: React.FC<Post> = ({ title, author, index,duration, date,  image, tags }) => {
    const router= useRouter();
  return (
      <div onClick={()=>{
          router.push(`/post/${index}`)
      }} key={index}  className="block h-full outline-none focus:outline-none">


          <div className="px-1 md:px-2 h-full relative max-w-screen-md cursor-pointer">


    <article className="p-8 rounded-lg flex flex-col h-full">
      {image && (
        <div className="relative w-full max-sm:min-h-[400px] min-h-[450px] h-4/5 flex-1 mb-6 rounded-xl overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority // Consider adding priority if this is often above the fold
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 800px" // Example sizes
          />
        </div>
      )}
      <div className=" flex flex-col flex-1 ">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag,index) => (
            <span key={index} className="text-sm px-3 py-1 bg-black/5 rounded-full">{tag}</span>
          ))}
        </div>
        <h2 className="font-rajdhani text-2xl w-full line-clamp-2 font-bold mb-4">{title}</h2>
        <div className="flex items-center gap-4 text-base text-gray-600 mb-4 flex-wrap" >
        <div
            className="hover:underline hover:text-black transition-colors font-semibold" // Added font-semibold
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/author/${encodeURIComponent(author)}`);
            }}
          >
            <span>
            {author}
            </span>
          </div>
          <span>•</span>
          <span>{duration}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
      </div>
      </div>
  );
};


export type { PostProps }; // Keep exporting the type
