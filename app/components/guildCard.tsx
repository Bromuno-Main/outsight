// app/components/guildCard.tsx
import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guild, Post } from '../data/posts'; // Adjust path if needed
import { FaUsers, FaBookOpen, FaTag, FaFileAlt } from 'react-icons/fa'; // Added FaFileAlt

interface GuildCardProps {
    guild: Guild;
    allPosts: Post[]; // Need all posts to find the ones belonging to the guild
}

const GuildCard: FC<GuildCardProps> = ({ guild, allPosts }) => {
    // 1. Find posts written by authors in this guild
    const guildPosts = allPosts.filter(post =>
        guild.authorNames.includes(post.author)
    );

    // 2. Get up to 3 posts for preview (can be any 3, or sort by date if posts have dates)
    // Let's take the first 3 found for simplicity
    const postPreviews = guildPosts.slice(0, 3);

    // 3. Calculate stats
    const memberCount = guild.authorNames.length;
    const totalPostCount = guildPosts.length; // Total posts by guild members

    return (
        <Link
            href={`/guild/${guild.id}`}
            className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105745]"
        >
            {/* Header Section */}
            <div className="p-4 border-b border-gray-100 flex items-start gap-4">
                {guild.profilePicture ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                            src={guild.profilePicture}
                            alt={`${guild.name} logo`}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                    </div>
                ) : (
                    // Fallback Icon if no profile picture
                    <div className="w-16 h-16 rounded-md flex-shrink-0 bg-gray-200 flex items-center justify-center text-gray-400">
                        <FaUsers className="w-8 h-8" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-900 group-hover:text-[#105745] transition-colors duration-200 truncate mb-1">
                        {guild.name}
                    </h5>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                        <FaTag className="text-gray-500" /> {guild.theme}
                    </span>
                </div>
            </div>

            {/* Post Previews Section */}
            <div className="p-4 flex-grow">
                <h6 className="text-sm font-semibold text-gray-700 mb-2">Recent Posts:</h6>
                {postPreviews.length > 0 ? (
                    <ul className="space-y-1.5">
                        {postPreviews.map(post => (
                            <li key={post.index} className="flex items-start gap-2 text-sm text-gray-600">
                                <FaFileAlt className="w-3 h-3 mt-1 text-gray-400 flex-shrink-0" />
                                <span className="line-clamp-1">{post.title}</span>
                            </li>
                        ))}
                        {totalPostCount > 3 && (
                             <li className="text-xs text-gray-500 italic pt-1">...and {totalPostCount - 3} more</li>
                        )}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 italic">No posts from this guild yet.</p>
                )}
            </div>

            {/* Footer Stats Section */}
            <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-600 flex items-center justify-end gap-4">
                 <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{memberCount} {memberCount === 1 ? 'Member' : 'Members'}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <FaBookOpen />
                    <span>{totalPostCount} {totalPostCount === 1 ? 'Post' : 'Posts'}</span>
                </div>
            </div>
        </Link>
    );
};

export default GuildCard;
