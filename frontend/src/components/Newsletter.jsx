// import React from 'react'

// const Newsletter = () => {
//   return (
//     <div className='h-60 justify-center justify-items-center pt-17 bg-gray-300 space-y-3' >
//       <div className="text sm:text-5xl linden-hill-regular ">
//         Subscribe for Newsletter
//         <p className='text sm:text-2xl place-self-center' >Get latest updates</p>
//       </div>
//       <div className="emailEnter sm:grid sm:grid-cols-2 sm:gap-2 ">
//         <input type="email" placeholder='Enter your email'/>
//         <button className='bg-gray-500 p-2 rounded-xl' >Subscribe</button>

//       </div>
//     </div>
//   )
// }

// export default Newsletter

import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Get the latest updates, deals, and trends directly to your inbox.
      </p>

      <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;

