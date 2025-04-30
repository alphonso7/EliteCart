import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1_product_i1.png'; 
import p2 from '../assets/product_24.png'; 
import p3 from '../assets/product_36.png'; 
import p4 from '../assets/shopping-bag.png'; 



const Categories = () => {
    const [menu, setMenu] = useState("Shop");
  return (
    <div>
      {/* Nav Links */}
      <div className="bg-blue-50 border-t border-gray-200">
        <ul className="flex justify-center space-x-8 py-2 text-sm font-medium text-gray-700">
          <li><Link to="/Shop" onClick={() => setMenu("Shop")} className={`hover:text-blue-600 ${menu === "Shop" && "text-blue-600 border-b-2 border-blue-600"}`}> <img className="w-13 h-13 object-contain mb-1" src={p4} alt="" /> Shop</Link></li>
          <li><Link to="/Men" onClick={() => setMenu("Men")} className={`hover:text-blue-600 ${menu === "Men" && "text-blue-600 border-b-2 border-blue-600"}`}> <img className="w-13 h-13 object-contain mb-1" src={p2} alt="" /> Men</Link></li>
          <li><Link to="/Women" onClick={() => setMenu("Women")} className={`hover:text-blue-600 ${menu === "Women" && "text-blue-600 border-b-2 border-blue-600"}`}> <img className="w-13 h-13 object-contain mb-1" src={p1} alt="" /> Women</Link></li>
          <li><Link to="/Kids" onClick={() => setMenu("Kids")} className={`hover:text-blue-600 ${menu === "Kids" && "text-blue-600 border-b-2 border-blue-600"}`}> <img className="w-13 h-13 object-contain mb-1" src={p3} alt="" /> Kids</Link></li>
          {/* <li><Link to="/Kids" onClick={() => setMenu("Kids")} className={`hover:text-blue-600 ${menu === "Kids" && "text-blue-600 border-b-2 border-blue-600"}`}>Kids</Link></li> */}
        </ul>
      </div>
    </div>
  )
}

export default Categories
