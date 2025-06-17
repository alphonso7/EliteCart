import React from 'react';
import hero_image from '../assets/exclusive_image.png';

const Banner = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between bg-gradient-to-r from-blue-100 to-white px-6 sm:px-16 py-16 rounded-lg shadow-md overflow-hidden">
    {/* Left Text Block */}
    <div className="text-center sm:text-left space-y-6 max-w-xl">
      <h1 className="text-4xl sm:text-5xl font-bold linden-hill-regular text-gray-800 leading-tight">
        Discover Our New Collection
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 font-serif">
        Fresh arrivals, exclusive styles, and handpicked favorites—designed to inspire your next look.
      </p>
      <button
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-medium shadow-md"
      >
        Explore Now
      </button>
    </div>
  
    {/* Right Image */}
    <div className="mb-8 sm:mb-0 sm:ml-12">
      <img
        src={hero_image}
        alt="New Collection"
        className="h-72 sm:h-96 object-contain drop-shadow-lg"
      />
    </div>
  </div>
  
  );
};

export default Banner;
