// import React from 'react'
// import new_collection from '../assets/new_collections'
// import Item from '../components/Item'

// const RelatedProducts = () => {
//   return (
//     <div className='w-full px-4' >
//       <div className="realatedProducts text-center my-6 ">
//         <h1 className='text-2xl font-semibold text-gray-600' >Related Products</h1>
//       </div>
//       <hr className='border-gray-300 my-4' />
//       <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6 ">
//         {new_collection.slice(0,3).map((item, i)=>{
//             return <Item key={i} id= {item.id} name= {item.name} image={item.image} newPrice = {item.new_price} oldPrice = {item.old_price} />  
//         })}
//       </div>
//     </div>
//   )
// }

// export default RelatedProducts

// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// // import all_products from '../assets/all_product';
// import { ShopContext } from '../Context/ShopContext';
// import Item from '../components/Item';

// const RelatedProducts = () => {
//     const { ProductId } = useParams();
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const {all_products} = useContext(ShopContext); 

//     useEffect(() => {
//         const findRelatedProducts = async () => {
//             console.log("Fetching related products for ID:", ProductId);

//             const product = all_products.find(p => p.id === parseInt(ProductId));
//             if (!product) {
//                 console.error("Product not found!");
//                 return;
//             }
//             console.log("Selected product:", product);

//             const currentColor = await getCenterColor(product.image);
//             if (!currentColor) {
//                 console.error("Failed to extract color.");
//                 return;
//             }
//             console.log("Extracted color for selected product:", currentColor);

//             let similarProducts = [];

//             for (const p of all_products) {
//                 if (p.id !== parseInt(ProductId)) {
//                     const productColor = await getCenterColor(p.image);
//                     if (productColor) {
//                         const distance = colorDistance(currentColor, productColor);
//                         similarProducts.push({ ...p, distance });
//                     }
//                 }
//             }

//             similarProducts.sort((a, b) => a.distance - b.distance);
//             setRelatedProducts(similarProducts.slice(0, 5));
//             console.log("Related products found:", similarProducts.slice(0, 5));
//         };

//         findRelatedProducts();
//     }, [ProductId]);

//     const getCenterColor = (imageSrc) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "Anonymous"; // Prevent CORS issues
//             img.src = imageSrc;

//             img.onload = () => {
//                 const canvas = document.createElement("canvas");
//                 const ctx = canvas.getContext("2d");
//                 canvas.width = img.width;
//                 canvas.height = img.height;

//                 ctx.drawImage(img, 0, 0, img.width, img.height);

//                 const centerX = Math.floor(img.width / 2);
//                 const centerY = Math.floor(img.height / 2);
//                 const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;

//                 const color = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
//                 console.log(`Extracted color from ${imageSrc}:`, color);
//                 resolve(color);
//             };

//             img.onerror = (error) => {
//                 console.error(`Error loading image: ${imageSrc}`, error);
//                 reject(error);
//             };
//         });
//     };

//     const colorDistance = (color1, color2) => {
//         return Math.sqrt(
//             Math.pow(color1.r - color2.r, 2) +
//             Math.pow(color1.g - color2.g, 2) +
//             Math.pow(color1.b - color2.b, 2)
//         );
//     };

//     return (
//         <div className='w-full px-4'>
//             <div className="relatedProducts text-center my-6">
//                 <h1 className='text-2xl font-semibold text-gray-600'>Related Products</h1>
//             </div>
//             <hr className='border-gray-300 my-4' />
//             <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
//                 {relatedProducts.length > 0 ? (
//                     relatedProducts.map((item, i) => (
//                         <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No related products found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RelatedProducts;

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../components/Item';

const RelatedProducts = () => {
    const { ProductId } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [metrics, setMetrics] = useState({ totalScanned: 0, relatedFound: 0, processingTime: 0 });
    const { all_products } = useContext(ShopContext); 

    useEffect(() => {
        const findRelatedProducts = async () => {
            const startTime = performance.now(); // Start timer

            console.log("Fetching related products for ID:", ProductId);
            const product = all_products.find(p => p.id === parseInt(ProductId));
            if (!product) {
                console.error("Product not found!");
                return;
            }
            console.log("Selected product:", product);

            const currentColor = await getCenterColor(product.image);
            if (!currentColor) {
                console.error("Failed to extract color.");
                return;
            }
            console.log("Extracted color for selected product:", currentColor);

            let similarProducts = [];
            let scannedCount = 0;

            for (const p of all_products) {
                scannedCount++;
                if (p.id !== parseInt(ProductId)) {
                    const productColor = await getCenterColor(p.image);
                    if (productColor) {
                        const distance = colorDistance(currentColor, productColor);
                        similarProducts.push({ ...p, distance });
                    }
                }
            }

            similarProducts.sort((a, b) => a.distance - b.distance);
            const selectedProducts = similarProducts.slice(0, 5);

            setRelatedProducts(selectedProducts);
            setMetrics({
                totalScanned: scannedCount,
                relatedFound: selectedProducts.length,
                processingTime: performance.now() - startTime, // Calculate processing time
            });

            console.log("Related products found:", selectedProducts);
        };

        findRelatedProducts();
    }, [ProductId]);

    const getCenterColor = (imageSrc) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imageSrc;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                const centerX = Math.floor(img.width / 2);
                const centerY = Math.floor(img.height / 2);
                const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;

                const color = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
                console.log(`Extracted color from ${imageSrc}:`, color);
                resolve(color);
            };

            img.onerror = (error) => {
                console.error(`Error loading image: ${imageSrc}`, error);
                reject(error);
            };
        });
    };

    const colorDistance = (color1, color2) => {
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2)
        );
    };

    return (
        <div className='w-full px-4'>
            <div className="relatedProducts text-center my-6">
                <h1 className='text-2xl font-semibold text-gray-600'>Related Products</h1>
            </div>
            <hr className='border-gray-300 my-4' />

            {/* Metrics Section */}
            <div className="metrics text-center my-4 p-4 bg-gray-100 rounded-md">
                <p><strong>Total Products Scanned:</strong> {metrics.totalScanned}</p>
                <p><strong>Related Products Found:</strong> {metrics.relatedFound}</p>
                <p><strong>Processing Time:</strong> {metrics.processingTime.toFixed(2)} ms</p>
            </div>

            <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item, i) => (
                        <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
