// import React, { useState, useEffect } from 'react';

// const ImageSlider = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const slide = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(slide); // Cleanup on unmount
//   }, [images.length, interval]);

//   return (
//     <div className="relative w-full h-64 overflow-hidden shadow-md rounded-md">
//       {images.map((img, index) => (
//         <img
//           key={index}
//           src={img}
//           alt={`Slide ${index}`}
//           className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//         />
//       ))}
//     </div>
//   );
// };

// export default ImageSlider;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // You can use any icons you prefer

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const slide = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(slide); // Cleanup
  }, [currentIndex, interval]);

  return (
    <div className="relative w-full h-64 overflow-hidden shadow-md rounded-md">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0 object-cover h-64"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white shadow"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white shadow"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
