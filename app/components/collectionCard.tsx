// c:\Users\DELL\Documents\GitHub\insight\app\components\CollectionCard.tsx
import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { Collection, Post } from '../data/posts'; // Assuming Collection and Post interfaces are exported from here
import { FaRegFileAlt, FaUsers } from 'react-icons/fa'; // Example icons

interface CollectionCardProps {
    collection: Collection; // The specific collection data
    allPosts: Post[];      // The full array of all posts to look up from
    index: number;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection, allPosts,index }) => {
    // --- Data Processing (remains the same) ---

    // 1. Find all posts belonging to this collection using the indices
    const postsInCollection = allPosts.filter(post =>
        collection.postIndices.includes(post.index)
    );

    // 2. Get the last post in the collection (if any)
    const lastPost = postsInCollection.length > 0
        ? postsInCollection[postsInCollection.length - 1]
        : null;

    // 3. Get the image URL and alt text from the last post
    // Provide fallbacks if the last post or its image doesn't exist
    const imageUrl = lastPost?.image?.src;
    const imageAlt = lastPost?.image?.alt || `Image for collection: ${collection.name}`;

    // 4. Calculate the number of posts in the collection
    const postCount = postsInCollection.length;

    // 5. Calculate the number of unique authors in the collection
    const authorsInCollection = postsInCollection.map(post => post.author);
    const uniqueAuthors = new Set(authorsInCollection);
    const authorCount = uniqueAuthors.size;

    console.log("Rendering CollectionCard for ID:", collection.id, "Name:", collection.name);

    // --- Render Logic with Link Wrapper ---
    return (
        // Wrap the entire card content with the Link component
        <Link
            key={index}
            href={`/collection/${collection.id}`} // Dynamic link to the collection page
            // Apply the original article's classes + focus styles
            className="flex flex-col bg-[#F8F1E6] rounded-3xl p-6 justify-center overflow-hidden hover:bg-white cursor-pointer transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105745]"
        >
            {/* Image Section */}
            <div className="flex gap-3 items-center mb-1"> {/* Removed justify-center as parent flex handles centering */}
                <div className="relative rounded-lg overflow-hidden aspect-square size-12 bg-gray-200 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            className="object-cover" // Ensures image covers the area
                            sizes="48px" // Hint for optimization
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            {/* Simplified fallback */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex flex-col flex-1 min-w-0"> {/* Added min-w-0 for potential text overflow */}
                    <h5 className="font-rajdhani text-xl font-semibold line-clamp-1">
                        {collection.name}
                    </h5>
                    <div className="flex items-center gap-x-4 gap-y-1 w-full text-xs text-gray-500 mt-auto pt-1"> {/* Adjusted gaps/padding */}
                        <div className="flex items-center gap-1.5">
                            <FaRegFileAlt />
                            <span>{postCount} {postCount === 1 ? 'Post' : 'Posts'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaUsers />
                            {/* Display author count number directly */}
                            <span>{authorCount} {authorCount === 1 ? 'Author' : 'Authors'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {collection.description && ( // Conditionally render the description container
                <div className="mt-3 flex flex-col flex-1 flex-grow"> {/* Added margin-top */}
                    <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                        {collection.description}
                    </p>
                </div>
            )}
        </Link> // Close the Link component
    );
};

export default CollectionCard;
