
import React, { useContext, useState, useEffect } from 'react';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';
import location from '../assets/location.png';
import sizechart from '../assets/sizechart.jpg';
import sizechart_logo from '../assets/sizechart_logo.png';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDisplay = (props) => {
  const { addToCart, addSizeToMap, addQuantityToMap } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const userId = localStorage.getItem('userId');

  const [user, setUser] = useState({
    name: '',
    email: '',
    date: '',
    address: ''
  });

  const handleSizeChart = () => {
    setShowSizeChart(true);
  }

  const handleCloseSizeChart = () => {
    setShowSizeChart(false);
  }

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const data = await response.json();
        setUser(data);

      } catch (err) {
        console.error(err, 'not data received');
      }
    }

    fetchUser();

  }, [userId]);


  return (
    <>
      <div className="flex flex-col md:flex-row mx-6 md:mx-10 my-6 gap-6">
        {/* Left Thumbnails */}
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              className="w-24 h-28 object-cover rounded border hover:scale-105 transition"
              src={props.productImage}
              alt={`Thumbnail ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className=" flex-1 flex justify-center items-center pb-50">
          <img
            className="w-full max-w-md object-cover rounded shadow-lg"
            src={props.productImage}
            alt={props.productName}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{props.productName}</h1>

          <div>
            <div className="price-section flex items-center gap-2">
              <p className="old-price line-through text-gray-500">
                {props.productOldPrice}
              </p>
              <span className="badge bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                Special Offer
              </span>
              <p className="new-price text-green-600 font-bold text-3xl">
                {props.productNewPrice} INR
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Experience the perfect blend of innovation, performance, and reliability with this premium-quality product — expertly designed to meet the evolving demands of modern consumers. Whether you're a discerning enthusiast or a first-time buyer, this product delivers exceptional functionality that sets a new standard in its category.
            </p>
            <p className='text-gray-500 font-semibold text-sm'>Key Features:</p>

            <p className='text-gray-500  text-sm' >Superior Quality Materials: Crafted from high-grade, durable components to ensure long-lasting performance and resilience under daily use.</p>

            <p className='text-gray-500  text-sm' >Advanced Technology: Integrated with cutting-edge features to enhance usability, efficiency, and overall satisfaction.</p>

            <p className='text-gray-500 text-sm' >Ergonomic & User-Friendly Design: Engineered with precision for optimal comfort and ease of use, tailored to suit diverse preferences and requirements.</p>


          </div>

          {/* Sizes */}
          <div className='' >
            <p className="font-semibold mb-1">Select your size:</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full border font-medium ${selectedSize === size ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                    } hover:bg-red-400 transition`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="mt-4 flex">
              <button
                onClick={handleSizeChart}
                className="bg-blue-100 text-black hover:bg-blue-100 cursor-pointer transition"
              >
                Size guide
              </button>
              <img src={sizechart_logo} alt="" className='w-8 h-auto ml-2' />
            </div>

            {/* Fullscreen Size Chart Modal */}
            {showSizeChart && (
              <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-screen-lg w-full">
                  <button
                    onClick={handleCloseSizeChart}
                    className="absolute top-2 right-2 text-black bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  >
                    Close
                  </button>
                  <img
                    src={sizechart}
                    alt="Size Chart"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quantity */}
          <label className="block mt-4 font-semibold">Select Quantity:</label>
          <select
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            className="border p-2 rounded mt-1"
          >
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

            {/* Deliver to */}
          <div className="flex items-center gap-3 p-4 bg-white rounded shadow mb-4">
            <img src={location} alt="location icon" className="h-5 w-5" />
            <h3 className="text-lg font-semibold text-gray-800">Deliver to:</h3>
            {user.address ? (
              <p className="text-gray-700 ml-2 truncate text-xl">{user.address}</p>
            ) : (
              <p className="text-red-500 ml-2 text-xl">Login to see availability</p>
            )}
          </div>




          {/* Add to Cart */}
          <div>
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size first");
                  return;
                }

                console.log("✅ Selected Size:", selectedSize);
                addSizeToMap(props.productId, selectedSize);
                addQuantityToMap(props.productId, selectedQuantity);
                addToCart(props.productId, selectedSize, selectedQuantity);
              }}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-gray-300 hover:text-black transition font-semibold"
            >
              Add to Cart
            </button>
          </div>


          {/* Reviews */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold">Reviews:</span>
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-5 h-5" src={star_icon} alt="star" />
            ))}
            <img className="w-5 h-5" src={star_dull_icon} alt="star" />
            <span className="text-sm text-gray-500">(24,345)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;

