import React from 'react'
import Banner from '../components/Banner'
import Popular from '../components/Popular'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import NewCollections from '../components/NewCollections'
import home_banner from '../assets/home_banner.jpg'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductDisplay from '../components/ProductDisplay'
import Item from '../components/Item'

const Shop = () => {
  const { filteredProducts } = useContext(ShopContext);
  const {searchQuery} = useContext(ShopContext);
  return (
    <div>
      {/* <section className='bg-light py-5'>
            <div className='row justify-items-center' >
                <div className='row justify-items-center'>
                  <h1 className='font-bold text-7xl linden-hill-regular'>New Collections</h1>
                </div>
                <div className='h-6 w-5xl border-amber-950 border-2' >
                  <p className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente earum at eligendi?</p>
                </div>
            </div>
        </section> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {searchQuery.trim() ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price} />
            ))
          ) : (
            <p>No products found</p>
          )
        ) : (
          <p className="text-center text-gray-500 hidden">Search for products...</p>
        )}

      </div>
      <Banner />
      <Popular />
      <img src={home_banner} alt="home_banner" className="h-auto w-full" />
      <NewCollections />
      <Newsletter />
      <Footer />

    </div>
  )
}

export default Shop
