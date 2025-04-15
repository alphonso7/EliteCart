import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='grid-cols-3 inline-block m-5 w-auto h-xl  pl-6 sm:pl-10 justify-items-center' >
      <Link to={`/Product/${props.id}`} > <img className='w-50 h-auto border-gray-400' src={props.image} alt="iamge" onClick={window.screen} /></Link>
      <div className='justify-center w-60 ' >
        <p className='overflow-clip text-stone-950 pt-2 font-serif ' >{props.name}</p>
        <p className='line-through' > INR {props.oldPrice} </p>
        <p className='text font-bold' >INR {props.newPrice} </p>
      </div>
    </div>
  )
}

export default Item

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Item = (props) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200 flex flex-col items-center">
//       <Link to={`/Product/${props.id}`} className="w-full flex justify-center mb-3">
//         <img
//           className="h-64 w-full object-contain"
//           src={props.image}
//           alt={props.name}
//         />
//       </Link>
//       <div className="text-center">
//         <p className="text-gray-800 font-semibold mb-1 line-clamp-1">{props.name}</p>
//         <p className="text-gray-500 line-through">${props.oldPrice}</p>
//         <p className="text-red-500 font-bold text-lg">${props.newPrice}</p>
//       </div>
//     </div>
//   );
// };

// export default Item;

