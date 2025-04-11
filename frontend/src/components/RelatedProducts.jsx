// import React, { useState, useEffect } from "react";
// import Item from "../components/Item";
// // import ColorThief from "color-thief-browser";
// import ColorThief from "colorthief";
// import { memo } from "react";

// const extractColor = async (imageUrl) => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.crossOrigin = "Anonymous"; 
//     img.src = imageUrl;

//     img.onload = async () => {
//       try {
//         await img.decode();
//         const colorThief = new ColorThief();
//         const palette = colorThief.getPalette(img, 8); // ✅ Extract 8 colors instead of 5

//         if (!palette || palette.length === 0) {
//           throw new Error("No colors extracted.");
//         }

//         // ✅ Remove colors that are too dark or too light
//         const validColors = palette.filter(([r, g, b]) => {
//           const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
//           return brightness > 40 && brightness < 220; // ✅ Ignore very dark & very light colors
//         });

//         // ✅ Choose the most vibrant color (not just the first one)
//         const vibrantColor = validColors.length > 0 ? validColors[0] : palette[0];

//         const dominantColor = `rgb(${vibrantColor[0]}, ${vibrantColor[1]}, ${vibrantColor[2]})`;
//         console.log(`🎨 Improved Extracted Color: ${dominantColor}`);
//         resolve(dominantColor);
//       } catch (error) {
//         console.error("❌ Color extraction failed:", error);
//         resolve("rgb(200, 200, 200)"); // ✅ Default gray if error
//       }
//     };

//     img.onerror = () => {
//       console.error("❌ Image failed to load:", imageUrl);
//       resolve("rgb(200, 200, 200)"); // ✅ Default gray if image fails
//     };
//   });
// };


// const RelatedProducts = memo( ({ selectedProduct }) => {
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log("🔄 useEffect triggered. Fetching related products for:", selectedProduct);
//     if (!selectedProduct || loading) return; // ✅ Prevent duplicate calls

//     setLoading(true); // ✅ Ensures API is only called once

//     // if (!selectedProduct) return;

//     setLoading(true);

//     extractColor(selectedProduct.image)
//       .then((dominantColor) => {
//         console.log("🎨 Extracted Color:", dominantColor); // Debugging

//         // fetch(`http://localhost:3000/api/recommendations?color=${encodeURIComponent(dominantColor)}`)
//         fetch(`http://localhost:3000/api/recommendations?color=${encodeURIComponent(dominantColor)}&productId=${selectedProduct._id}`)

//           .then((response) => {
//             if (!response.ok) {
//               throw new Error(`Server Error: ${response.status}`);
//             }
//             return response.json();
//           })
//           .then((data) => {
//             console.log("🎯 Fetched Related Products:", data);
//             setRelatedProducts(data);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error("❌ Error fetching related products:", error);
//             setLoading(false);
//           });
//       })
//       .catch(() => setLoading(false));
//   }, [selectedProduct]);

//   return (
//     <div className="w-full px-4">
//       <div className="relatedProducts text-center my-6">
//         <h1 className="text-2xl font-semibold text-gray-600">Related Products</h1>
//       </div>
//       <hr className="border-gray-300 my-4" />

//       {loading ? (
//         <p className="text-center text-gray-500">Loading related products...</p>
//       ) : relatedProducts.length > 0 ? (
//         <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
//           {relatedProducts.map((item) => (
//             <Item
//               key={item.id}
//               id={item.id}
//               name={item.name}
//               image={item.image}
//               newPrice={item.new_price}
//               oldPrice={item.old_price}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No related products found.</p>
//       )}
//     </div>
//   );
// });

// export default RelatedProducts;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../components/Item";

const RelatedProducts = ({ selectedProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
      if (!selectedProduct || !selectedProduct.id) {
          console.error("❌ No product ID found in selectedProduct:", selectedProduct);
          return;
      }
  
      const productId = selectedProduct.id;
      const apiUrl = `http://localhost:3000/api/recommendations?productId=${productId}`;
      console.log("🔗 API Request URL:", apiUrl);  // ✅ Debugging URL
  
      const fetchRelatedProducts = async () => {
          try {
              const response = await axios.get(apiUrl);
              console.log("🎯 Related Products:", response.data);
              setRelatedProducts(response.data);
          } catch (error) {
              console.error("❌ Error fetching related products:", error);
          }
      };
  
      fetchRelatedProducts();
  }, [selectedProduct]);
  
    return (
        <div className="w-full px-4">
            <div className="relatedProducts text-center my-6">
                <h1 className="text-2xl font-semibold text-gray-600">Related Products</h1>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="products grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => (
                        <Item
                            // key={item.product_id}
                            // id={item.product_id}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            newPrice={item.new_price}
                            oldPrice={item.old_price}

                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;

