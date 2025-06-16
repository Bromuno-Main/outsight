// c:\Users\DELL\Documents\GitHub\insight\app\components\SectionOne.tsx
'use client';

import React from 'react';
import Slider from 'react-slick';
import { PostLarge, PostSmall } from './Post/post';
import { posts } from '../data/posts';
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ... (Keep ArrowProps, Tags, uniqueTags, PrevArrow, NextArrow components as they are) ...
interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}



const Tags = posts.slice(4, 7);
const allTags = Tags.flatMap(post => post.tags);
const uniqueTags = Array.from(new Set(allTags)); // Get unique tags



const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
        <button
            className={` -bottom-4 absolute right-16 z-10 hidden cursor-pointer p-2`}
            onClick={onClick}
            aria-label="Previous slide"
        >
            <IoArrowBack />
        </button>
    );
};

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
        <button
            className={` right-8 -bottom-4 absolute cursor-pointer hidden z-10 p-2`}
            onClick={onClick}
            aria-label="Next slide"
        >
            <IoArrowForward />    </button>
    );
};


function SectionOne() {
  const carouselPosts = posts.slice(0, 4);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "-60px", padding: "42px", left: "10px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (<button className='size-16 outline'></button>)
  };

  return (
    <section className='w-full flex lg:flex-row lg:justify-between gap-5 flex-col py-10 lg:px-10 mt-10 lg:h-[90vh]'>
      {/* Carousel Section */}
      <div className="w-full bg-[#F8F1E6] rounded-[2.5rem] h-full overflow-hidden min-h-[80dvh] max-w-screen-sm ">
        <Slider {...settings}>
          {carouselPosts.map((post,index) => (
            // Wrap the slide content with Link
                <PostLarge key={index} {...post} />

          ))}
        </Slider>
      </div>

      {/* Right Side Section */}
      <div className="flex px-4 flex-col w-full md:w-2/5 gap-8 justify-end h-full ">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag,index) => (
            <span key={index} className="text-xs px-2.5 py-1 bg-black/5 hover:bg-black/10 text-gray-700 rounded-full cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
        {/* Featured Posts */}
        <div className="flex gap-3 flex-col">
          <span className="flex items-center justify-center px-4 text-white bg-red-400 w-fit rounded-full">featured</span>
          {posts.slice(4, 7).map((post,index) => (
              <PostSmall key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionOne;
