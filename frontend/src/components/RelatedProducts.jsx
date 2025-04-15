
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Item from "../components/Item";

// const RelatedProducts = ({ selectedProduct }) => {
//     const [relatedProducts, setRelatedProducts] = useState([]);

//     useEffect(() => {
//       if (!selectedProduct || !selectedProduct.id) {
//           console.error("❌ No product ID found in selectedProduct:", selectedProduct);
//           return;
//       }

//       const productId = selectedProduct.id;
//       const apiUrl = `http://localhost:3000/api/recommendations?productId=${productId}`;
//       console.log("🔗 API Request URL:", apiUrl);  // ✅ Debugging URL

//       const fetchRelatedProducts = async () => {
//           try {
//               const response = await axios.get(apiUrl);
//               console.log("🎯 Related Products:", response.data);
//               setRelatedProducts(response.data);
//           } catch (error) {
//               console.error("❌ Error fetching related products:", error);
//           }
//       };

//       fetchRelatedProducts();
//   }, [selectedProduct]);

//     return (
//         <div className="w-full px-4">
//             <div className="relatedProducts text-center my-6">
//                 <h1 className="text-2xl font-semibold text-gray-600">Related Products</h1>
//             </div>
//             <hr className="border-gray-300 my-4" />
//             <div className="products grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
//                 {relatedProducts.length > 0 ? (
//                     relatedProducts.map((item) => (
//                         <Item
//                             // key={item.product_id}
//                             // id={item.product_id}
//                             key={item.id}
//                             id={item.id}
//                             name={item.name}
//                             image={item.image}
//                             newPrice={item.new_price}
//                             oldPrice={item.old_price}

//                         />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No related products found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RelatedProducts;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../components/Item";

const moodColors = {
    chill: { r: 150, g: 200, b: 230 },
    energetic: { r: 255, g: 80, b: 0 },
    happy: { r: 255, g: 215, b: 100 },
    elegant: { r: 100, g: 100, b: 100 },
    romantic: { r: 240, g: 120, b: 160 },
};

const RelatedProducts = ({ selectedProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [mood, setMood] = useState(null);
    const [showMoodOptions, setShowMoodOptions] = useState(false);
    const [showViewSimilarButton, setShowViewSimilarButton] = useState(false);


    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/allproducts");
                setAllProducts(response.data);
            } catch (error) {
                console.error("❌ Error fetching all products:", error);
            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (!selectedProduct || !selectedProduct.id) return;
        if (!mood) {
            const productId = selectedProduct.id;
            const apiUrl = `http://localhost:3000/api/recommendations?productId=${productId}`;
            const fetchRelatedProducts = async () => {
                try {
                    const response = await axios.get(apiUrl);
                    setRelatedProducts(response.data);
                } catch (error) {
                    console.error("❌ Error fetching related products:", error);
                }
            };
            fetchRelatedProducts();
        }
    }, [selectedProduct, mood]);
    useEffect(() => {
        if (!mood || allProducts.length === 0) return;
        const moodColor = moodColors[mood];

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
                    const pixel = ctx.getImageData(
                        Math.floor(img.width / 2),
                        Math.floor(img.height / 2),
                        1,
                        1
                    ).data;
                    resolve({ r: pixel[0], g: pixel[1], b: pixel[2] });
                };
                img.onerror = reject;
            });
        };

        const colorDistance = (c1, c2) => {
            return Math.sqrt(
                Math.pow(c1.r - c2.r, 2) +
                Math.pow(c1.g - c2.g, 2) +
                Math.pow(c1.b - c2.b, 2)
            );
        };

        const fetchByMood = async () => {
            const moodFiltered = await Promise.all(
                allProducts.map(async (p) => {
                    const color = await getCenterColor(p.image);
                    const dist = colorDistance(color, moodColor);
                    return { ...p, distance: dist };
                })
            );
            moodFiltered.sort((a, b) => a.distance - b.distance);
            setRelatedProducts(moodFiltered.slice(0, 6));
        };

        fetchByMood();

    }, [mood, allProducts]);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-600 justify-self-center ">Related Products</h1>
            <div className="flex justify-center my-4">
                {showViewSimilarButton && (
                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded shadow"
                        onClick={() => {
                            setMood(null); // Reset mood to fetch similar products
                            setShowViewSimilarButton(false); // Hide the button after clicking
                        }}
                    >
                        View Similar
                    </button>
                )}

                <div className="ml-4">
                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded shadow"
                        onClick={() => {
                            setShowMoodOptions(!showMoodOptions);
                            setShowViewSimilarButton(true); // Show the "View Similar" button
                        }}
                    >
                        How are you feeling today?
                    </button>
                    {showMoodOptions && (
                        <div className="absolute bg-white border mt-2 shadow-md rounded p-2 z-10">
                            {Object.keys(moodColors).map((m) => (
                                <button
                                    key={m}
                                    className="block text-left w-full px-2 py-1 hover:bg-gray-100"
                                    onClick={() => {
                                        setMood(m);
                                        setShowMoodOptions(false);
                                    }}
                                >
                                    {m.charAt(0).toUpperCase() + m.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <hr className="border-gray-300 my-4" />
            <div className="products grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => (
                        <Item
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