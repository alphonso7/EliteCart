// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useState, useContext } from 'react';
// import { ShopContext } from '../Context/ShopContext'

// const Navbar = () => {

//   const { searchQuery, setSearchQuery } = useContext(ShopContext);
//   const {getTotalCartItems} = useContext(ShopContext);
//   const [menu, setMenu] = useState("Shop");


//   return (
//     <nav className="m-0 bg-gray-200 shadow-xl w-full mx-auto sticky top-0 left-0">
//       <div className="container mx-auto md:flex justify-between items-center p-4 w-full ">
//         <a href="#" className="text-black text-5xl font-semibold linden-hill-regular">EliteCart</a>


   
//         {/* Navigation Links */}
//         <ul className=" md:flex space-x-6 text-gray-700 uppercase text-sm">
//           <li>Search</li>
//           <li><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full max-w-md p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder='Search' /></li>
//           <li><Link to="/Shop" onClick={()=> setMenu("Shop")} className="hover:text-black"> Shop {menu==="Shop"?<hr></hr>: <></>} </Link></li>
//           <li><Link to="/Men" onClick={()=> setMenu("Men")} className="hover:text-black"> Men {menu==="Men"?<hr></hr>: <></>}  </Link></li>
//           <li><Link to="/Women" onClick={()=> setMenu("Women")} className="hover:text-black">  Women{menu==="Women"?<hr></hr>: <></>} </Link></li>
//           <li><Link to="/Kids" onClick={()=> setMenu("Kids")} className="hover:text-black">  Kids {menu==="Kids"?<hr></hr>: <></>} </Link></li>
//         </ul>

//         {/* Icons */}
//         <div className="flex items-center space-x-4 text-gray-700">
//           <a href="#" className="hover:text-black">Wishlist (0)</a>
//           <Link to={'/Cart'} className="hover:text-black" >Cart({getTotalCartItems()})</Link>
//           {/* <a href="#" className="hover:text-black">Cart (0)</a> */}
//           {/* <a href="#" className="hover:text-black">Sign In</a> */}

//           {localStorage.getItem('auth-token')? <button className='hover:text-black cursor-pointer' onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace('/')}} >Logout</button>: <Link to={'/signup'} className='hover:text-black cursor-pointer' >Login</Link>}
          
//           {/* <FiSearch className="text-xl cursor-pointer hover:text-black" /> */}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import search_icon from '../assets/search_icon.png'; // your custom search icon

const Navbar = () => {
  const { searchQuery, setSearchQuery, getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("Shop");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-gray-200 shadow-xl w-full sticky top-0 left-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center p-4">

        {/* Logo */}
        <Link to="/" className="text-black linden-hill-regular text-4xl font-semibold">EliteCart</Link>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 uppercase text-sm">
          <li><Link to="/Shop" onClick={() => setMenu("Shop")} className="hover:text-black">Shop {menu === "Shop" && <hr />}</Link></li>
          <li><Link to="/Men" onClick={() => setMenu("Men")} className="hover:text-black">Men {menu === "Men" && <hr />}</Link></li>
          <li><Link to="/Women" onClick={() => setMenu("Women")} className="hover:text-black">Women {menu === "Women" && <hr />}</Link></li>
          <li><Link to="/Kids" onClick={() => setMenu("Kids")} className="hover:text-black">Kids {menu === "Kids" && <hr />}</Link></li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Your search icon */}
          <img
            src={search_icon}
            alt="Search"
            onClick={() => setShowSearch(!showSearch)}
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />

          {/* <span className="hover:text-black cursor-pointer">Wishlist (0)</span> */}
          <Link to="/Cart" className="hover:text-black">Cart({getTotalCartItems()})</Link>

          {
            localStorage.getItem('auth-token') ? (
              <button
                className="hover:text-black"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
              >Logout</button>
            ) : (
              <Link to="/signup" className="hover:text-black">Login</Link>
            )
          }
        </div>
      </div>

      {/* Search Input Bar */}
      {showSearch && (
        <div className="bg-white py-2 px-4 shadow-inner">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-2xl mx-auto block p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
