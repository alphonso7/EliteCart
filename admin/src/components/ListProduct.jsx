// import React, { useEffect, useState } from 'react'
// import './ListProduct.css'
// import cross_icon from '../../src/assets/cross_icon.png'

// const ListProduct = () => {


//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

//   const [allProducts, setAllProducts] = useState([]);

//   const fetchInfo = async () => {
//     await fetch("http://localhost:3000/allproducts")
//       .then((resp) => resp.json())
//       .then((data) => { setAllProducts(data) });
//   }

//   useEffect(() => {
//     fetchInfo();
//   }, []);

//   const removeProduct = async (idForDeleting) => {
//     await fetch('http://localhost:3000/removeproduct', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ id: idForDeleting })
//     })
//     await fetchInfo();
//   }

//   return (
//     <div className='list-product' >
//       <h1>All Products</h1>
//       <div className="format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>
//       <div className="all-products">
//         <hr />
//         {/* {allProducts.map((product,index)=>{ */}
//         {allProducts
//           .filter(product => {
//             const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               product._id.includes(searchTerm);
//             const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
//             const matchesPrice = product.new_price >= priceRange.min && product.new_price <= priceRange.max;
//             return matchesSearch && matchesCategory && matchesPrice;
//           })
//           .map((product, index) => {

//             <div className="filter-bar">
//               <input
//                 type="text"
//                 placeholder="Search by name or ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />

//               <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//                 <option value="">All Categories</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="fashion">Fashion</option>
//                 <option value="home">Home</option>
//                 {/* Add your actual category names */}
//               </select>

//               <input
//                 type="number"
//                 placeholder="Min Price"
//                 onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
//               />
//               <input
//                 type="number"
//                 placeholder="Max Price"
//                 onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
//               />
//             </div>


//             return <>
//               <div className="format-main format" key={index}>
//                 <img src={product.image} alt="" className="product-icon" />
//                 <p>{product.name}</p>
//                 <p>₹{product.old_price}</p>
//                 <p>₹{product.new_price}</p>
//                 <p>{product.category}</p>
//                 <img onClick={() => { removeProduct(product.id) }} src={cross_icon} alt="" className="remove-icon" />
//               </div>
//               <hr />
//             </>
//           })}
//       </div>

//     </div>
//   )
// }


// export default ListProduct

import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../src/assets/cross_icon.png';

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:3000/allproducts")
      .then((resp) => resp.json())
      .then((data) => { setAllProducts(data) });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (idForDeleting) => {
    await fetch('http://localhost:3000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idForDeleting })
    });
    await fetchInfo();
  };

  // 🔍 Filtered list based on search, category, and price
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product._id.includes(searchTerm);

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    const matchesPrice =
      product.new_price >= priceRange.min &&
      product.new_price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className='list-product'>
      <h1>All Products</h1>

      {/* 🔍 Filters Section */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="kid">kid</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
        />
      </div>

      {/* Table Headers */}
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Filtered Product List */}
      <div className="all-products">
        <hr />
        {filteredProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="format-main format">
              <img src={product.image} alt="" className="product-icon" />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => { removeProduct(product.id) }}
                src={cross_icon}
                alt="Remove"
                className="remove-icon"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
