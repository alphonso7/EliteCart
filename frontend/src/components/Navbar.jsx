
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import search_icon from '../assets/search_icon.png';
import Categories from '../components/Categories';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { searchQuery, setSearchQuery, getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("Shop");
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
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="text-blue-600 text-3xl font-bold">EliteCart</Link>

        {/* Search Bar */}
        <div className="flex flex-1 mx-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 p-2 rounded-r-md">
            <img src={search_icon} alt="Search" className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side Links */}
        <div className="flex items-center space-x-6 text-sm text-gray-700">
          <Link to="/Cart" className="hover:text-blue-600">Cart ({getTotalCartItems()})</Link>
          {/* {
            localStorage.getItem('auth-token') ? (
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
              >Logout</button>
            ) : (
              <Link to="/signup" className="hover:text-blue-600">Login</Link>
            )
          } */}
          {localStorage.getItem('auth-token') ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-2xl hover:text-blue-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* <FaUserCircle /> */}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10 text-left">
                  <Link
                    to="/yourorders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/myprofile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="hover:text-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

