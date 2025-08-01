 
import React, { useContext } from 'react';
import Banner from '../components/Banner';
import Popular from '../components/Popular';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import NewCollections from '../components/NewCollections';
import home_banner from '../assets/home_banner.jpg';
import Item from '../components/Item';
import { ShopContext } from '../Context/ShopContext';
import banner_kids from '../assets/banner_kids.png';
import banner_mens from '../assets/banner_mens.png';
import banner_women from '../assets/banner_women.png';
import ImageSlider from '../components/ImageSlider';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';

const Shop = () => {
  const { filteredProducts, searchQuery } = useContext(ShopContext);
  const images = [banner_kids, banner_mens, banner_women, home_banner];

  return (
    <>
    <Navbar/>
    <Categories/>
    <div className="bg-white text-gray-800">
      {/* Products Grid */}
      <section className=" sm:px-8 md:px-16">
        {searchQuery.trim() ? (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  oldPrice={item.old_price}
                  newPrice={item.new_price}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No products found for “{searchQuery}”</p>
          )
        ) : (
          <></> // you can show featured products or banner
        )}
      </section>

      <div className="p-4">
          <ImageSlider images={images} interval={3000} />
      </div>

      {/* Hero / Banner */}
      <Banner />

      {/* Popular Picks Section */}
      <section className="px-4 sm:px-8 md:px-16 py-10">
        <Popular />
      </section>

      {/* Home Banner Image */}
      <div className="my-8">
        <img
          src={home_banner}
          alt="Home Banner"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* New Collections Section */}
      <section className="px-4 sm:px-8 md:px-16 py-10">
        <NewCollections />

      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
};

export default Shop;

