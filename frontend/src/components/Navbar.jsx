
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import search_icon from '../assets/search_icon.png';
import { useNavigate } from 'react-router-dom';
import user_icon from '../assets/user_icon.png';
import order_icon from '../assets/order_icon.png';
import { motion, AnimatePresence } from 'framer-motion';
import cart_icon from '../assets/cart_icon.png';
import seller_logo from '../assets/ecommerce_logo.png';
import notification_logo from '../assets/notification_logo.png';
import coupon_logo from '../assets/coupon_logo.png';

const Navbar = () => {
  const { searchQuery, setSearchQuery, getTotalCartItems } = useContext(ShopContext);
  // const [menu, setMenu] = useState("Shop");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="text-blue-600 text-3xl font-bold">EliteCart</Link>

        {/* Search Bar */}
        <div className="flex mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-2xl px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
          <button className="bg-blue-500 p-2 rounded-r-md">
            <img src={search_icon} alt="Search" className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side Links */}
        <div className="flex items-center space-x-6 text-sm text-gray-700">
          <img src={seller_logo} alt="" className='w-auto h-6 mr-2' />
          <Link className='text-xl hover:text-blue-600' >Become a seller</Link>
          <img src={cart_icon} alt="" className='w-auto h-6 mr-2' />
          <Link to="/Cart" className="hover:text-blue-600 text-xl">Cart ({getTotalCartItems()})</Link>
          {localStorage.getItem('auth-token') ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-2xl hover:text-blue-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img className='w-10 h-auto' src={user_icon} alt="icon" />
              </button>

              <AnimatePresence>
                {/* <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10 text-left"> */}
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10 text-left"
                  >

                    <Link
                      to="/yourorders"
                      className=" flex flex-row px-4 py-2 hover:bg-gray-100"
                    >
                      <img className='w-5 h-auto mr-2' src={order_icon} alt="icon" />
                      My Orders
                    </Link>
                    <Link
                      to="/myprofile"
                      className="flex flex-row px-4 py-2 hover:bg-gray-100"
                    >
                      <img className='w-5 h-auto mr-2' src={user_icon} alt="icon" />
                      My Profile
                    </Link>
                    <Link 
                      className='flex flex-row px-4 py-2'
                     >
                      <img src={notification_logo} alt="" className='w-5 h-auto mr-2' />
                      Notifications
                    </Link>
                    <Link 
                      className='flex flex-row px-4 py-2' 
                    >
                      <img src={coupon_logo} alt="" className='w-5 h-auto mr-2' />
                      Coupons
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/signup" className="hover:text-blue-600 text-xl">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

