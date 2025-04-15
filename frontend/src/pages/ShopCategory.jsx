// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import dropdown_icon from '../assets/dropdown_icon.png'
// import Item from '../components/Item'
// import Footer from '../components/Footer'

// const ShopCategory = (props) => {
//   const {all_products} = useContext(ShopContext)
//   return (
//     <div className='banner'>
//       <div>
//       <img src={props.banner} alt="banner" />
//       </div>
//       <div className="itemSort m-4">
//         <p>
//           <span>
//             Showing 1-12 items 
//           </span>
//           Out of 36 prodcuts
//         </p>
//       </div>
//       <div className='m-4'>
//         Sort by <img src={dropdown_icon} alt="" />
//       </div>
//       <div className="items grid-cols-3">
//         {all_products.map((item, i)=>{
//           if(props.category==item.category){
//             return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice = {item.new_price} />
//           }
//           else{
//             return null;
//           }
//         })}
//       </div>
//       <Footer/>
//     </div>
    
//   )
// }

// export default ShopCategory

import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from '../components/Item'
import Footer from '../components/Footer'

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtered by category
  const filteredProducts = all_products.filter(item => item.category === props.category);

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
  

  return (
    <div className='banner'>
      <div>
        <img src={props.banner} alt="banner" className="w-full h-auto" />
      </div>

      <div className="m-4 text-sm text-gray-600">
        <p>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
        </p>
      </div>

      <div className='m-4 flex items-center space-x-2'>
        <span className='text-sm text-gray-700'>Sort by</span>
        <img src={dropdown_icon} alt="Sort icon" className='w-4 h-4' />
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

      {/* Pagination Controls */}
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

      <Footer />
    </div>
  );
};

export default ShopCategory;
