'use client';
import React, { useState, useMemo } from 'react';
import { PostMedium } from './Post/post';
import { posts } from '../data/posts';

function SectionTwo() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const sectionPosts = posts.slice(4, 7); // Use posts 4, 5, 6 for this section

  const uniqueTags = useMemo(() => {
    const allTags = sectionPosts.flatMap(post => post.tags);
    return Array.from(new Set(allTags));
  }, [sectionPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return sectionPosts;
    }
    return sectionPosts.filter(post => post.tags.includes(selectedTag));
  }, [selectedTag, sectionPosts]);

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <section className="w-full p-8 md:p-12 rounded-2xl">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Tag Filter Buttons */}
          <div className="flex flex-wrap font-[rajdhani] font-bold gap-2 mb-4">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${!selectedTag ? 'bg-green-500 text-black' : 'bg-white/0 text-black hover:bg-gray-200'}`}
            >
              Recent
            </button>
            {uniqueTags.map((tag,index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${selectedTag === tag ? 'bg-green-500 text-black' : 'bg-white/0 text-black hover:bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Filtered Post List */}
          <div className="flex flex-col gap-6 max-w-screen-md ">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post,index) => (

                  <PostMedium key={index} {...post} />

              ))
            ) : (
              <p className="text-gray-600 text-center py-4">
                No articles found matching the tag
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTwo;
