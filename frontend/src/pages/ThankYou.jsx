import React from 'react'
import { Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

const ThankYou = () => {
      return (
      <>
      <Navbar/>
      <Categories/>
      <hr />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Thank you!</h1>
          <p className="text-lg text-gray-700 mb-6">Your order is placed.</p>
          <p className="text-lg text-gray-700 mb-6" >You can check see it here</p>
          <Link to="/yourorders" >
          <button
            // onClick={() => window.location.href = '/shop'}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            My orders
          </button>
          </Link>
        </div>
      </div>
      <Footer/>
      </>
      );
}

export default ThankYou
