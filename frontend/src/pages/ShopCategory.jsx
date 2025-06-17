 
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../components/Item'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortOrder, setSortOrder] = useState('');
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    price: '',
    discount: '',
  });

  // Filtered by category
  let filteredProducts = all_products.filter(item => item.category === props.category);

  // Apply filters
  if (filters.price === 'low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.new_price - b.new_price);
  } else if (filters.price === 'high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.new_price - a.new_price);
  }


  // Apply discount filter
  if (filters.discount) {
    const minDiscount = parseInt(filters.discount);
    filteredProducts = filteredProducts.filter(
      item => ((item.old_price - item.new_price) / item.old_price) * 100 >= minDiscount
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <Categories />
      <div className="banner flex flex-col md:flex-row bg-blue-50">
        <div className="md:w-1/5 p-4 bg-white shadow m-6 h-80 sticky top-20 ">
          <h2 className="text-2xl font-semibold mb-2 ">Filters</h2>
          <hr className='' />
          <div className="mb-4">
            <label className="block mb-1 font-medium pt-3 pb-2">Sort by Price</label>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium pt-3 pb-2">Filter by Discount</label>
            <select
              name="discount"
              value={filters.discount}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="10">10% or more</option>
              <option value="30">30% or more</option>
              <option value="50">50% or more</option>
            </select>
          </div>


        </div>

        <div className="md:w-3/4 p-4">
          <div>
            <img src={props.banner} alt="banner" className="w-full h-auto" />
          </div>

          <div className="m-4 text-sm text-gray-700 font-semibold">
            <p>
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
            </p>
          </div>

          <div className="items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {currentItems.map((item, i) => (
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

          <div className="flex justify-center items-center my-6 space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>

         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopCategory;

