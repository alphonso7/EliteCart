// import React from 'react'
// import hero_image from '../assets/exclusive_image.png'
// import NewCollections from './NewCollections'

// const Banner = () => {
//   return (
//     <div className='flex bg-blue-200 justify-evenly justify-items-center '>
//       <div className="bannerText justify-items-center pt-30 ">
//         <h1 className='font-bold  text-2xl sm:text-7xl linden-hill-regular p-3 bottom-3' >New Collections</h1>
//         <p className='text-4xl font-serif'>Give it a try</p>
//         <div className="bannerButton">
//         <button className='bg-gray-400 h-10 w-auto p-2 rounded-xl' >Explore Now</button>
//       </div>
//       </div>
      
//       <div className="bannerPhoto hidden sm:flex">
//         <img className=' h-80 w-auto object-contain' src={hero_image} alt="HeroImage" />
//       </div>
//     </div>
//   )
// }

// export default Banner
 
import React from 'react';
import hero_image from '../assets/exclusive_image.png';

const Banner = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between bg-blue-100 px-6 sm:px-16 py-12">
      {/* Left Text Block */}
      <div className="text-center sm:text-left space-y-5">
        <h1 className="text-4xl sm:text-6xl font-bold linden-hill-regular text-gray-800">
          New Collections
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 font-serif">Give it a try</p>
        <button onClick={window.scrollTo({bottom: 0, behavior: 'smooth'})} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Explore Now
        </button>
      </div>

      {/* Right Image */}
      <div className="mb-6 sm:mb-0">
        <img
          src={hero_image}
          alt="HeroImage"
          className="h-72 sm:h-80 object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
