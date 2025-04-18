
import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../components/Item";
import chroma from "chroma-js";


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
    const [avgColorDistance, setAvgColorDistance] = useState(null);


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

        // const getCenterColor = (imageSrc) => {
        //     return new Promise((resolve, reject) => {
        //         const img = new Image();
        //         img.crossOrigin = "Anonymous";
        //         img.src = imageSrc;
        //         img.onload = () => {
        //             const canvas = document.createElement("canvas");
        //             const ctx = canvas.getContext("2d");
        //             canvas.width = img.width;
        //             canvas.height = img.height;
        //             ctx.drawImage(img, 0, 0, img.width, img.height);
        //             const pixel = ctx.getImageData(
        //                 Math.floor(img.width / 2),
        //                 Math.floor(img.height / 2),
        //                 1,
        //                 1
        //             ).data;
        //             resolve({ r: pixel[0], g: pixel[1], b: pixel[2] });
        //         };
        //         img.onerror = reject;
        //     });
        // };
        const getAverageCenterColor = (imageSrc) => {
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
        
                    const regionSize = 50;
                    const startX = Math.max(Math.floor(img.width / 2 - regionSize / 2), 0);
                    const startY = Math.max(Math.floor(img.height / 2 - regionSize / 2), 0);
                    const pixelData = ctx.getImageData(startX, startY, regionSize, regionSize).data;
        
                    let r = 0, g = 0, b = 0, count = 0;
                    for (let i = 0; i < pixelData.length; i += 4) {
                        r += pixelData[i];
                        g += pixelData[i + 1];
                        b += pixelData[i + 2];
                        count++;
                    }
        
                    resolve({ r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) });
                };
                img.onerror = reject;
            });
        };
        

        // const colorDistance = (c1, c2) => {
        //     return Math.sqrt(
        //         Math.pow(c1.r - c2.r, 2) +
        //         Math.pow(c1.g - c2.g, 2) +
        //         Math.pow(c1.b - c2.b, 2)
        //     );
        // };
        const colorDistance = (c1, c2) => {
            const lab1 = chroma.rgb(c1.r, c1.g, c1.b).lab();
            const lab2 = chroma.rgb(c2.r, c2.g, c2.b).lab();
            const deltaE = Math.sqrt(
                Math.pow(lab1[0] - lab2[0], 2) +
                Math.pow(lab1[1] - lab2[1], 2) +
                Math.pow(lab1[2] - lab2[2], 2)
            );
            return deltaE;
        };
        
        // const fetchByMood = async () => {
        //     const moodFiltered = await Promise.all(
        //         allProducts.map(async (p) => {
        //             const color = await getCenterColor(p.image);
        //             const dist = colorDistance(color, moodColor);
        //             return { ...p, distance: dist, color };
        //         })
        //     );
            
        //     moodFiltered.sort((a, b) => a.distance - b.distance);
        //     const topProducts = moodFiltered.slice(0, 10);
            
        //     // Calculate average color distance
        //     const avgDistance = topProducts.length > 0
        //         ? (topProducts.reduce((sum, p) => sum + p.distance, 0) / topProducts.length).toFixed(2)
        //         : null;
        
        //     setAvgColorDistance(avgDistance);
        //     setRelatedProducts(topProducts);
        // };
        const fetchByMood = async () => {
            const moodFiltered = await Promise.all(
                allProducts.map(async (p) => {
                    const color = await getAverageCenterColor(p.image);
                    const dist = colorDistance(color, moodColor);
                    return { ...p, distance: dist, color };
                })
            );
        
            moodFiltered.sort((a, b) => a.distance - b.distance);
            const topProducts = moodFiltered.slice(0, 6);
        
            const avgDistance = topProducts.length > 0
                ? (topProducts.reduce((sum, p) => sum + p.distance, 0) / topProducts.length).toFixed(2)
                : null;
        
            const stdDev = topProducts.length > 1
                ? Math.sqrt(topProducts.reduce((sum, p) => sum + Math.pow(p.distance - avgDistance, 2), 0) / topProducts.length).toFixed(2)
                : null;
        
            setAvgColorDistance(`${avgDistance} (±${stdDev})`);
            setRelatedProducts(topProducts);
        };
        
        

        fetchByMood();

    }, [mood, allProducts]);

    return (
        <div>
            <hr className="border-gray-300 my-4" />
            <h1 className="text-2xl font-semibold text-gray-600 justify-self-start pl-10 ">You might be interested in</h1>
            <div className="flex justify-self-end pr-10 mb-6">
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
            

            <h2 className="text-xl font-semibold text-gray-600 justify-self-center " >{mood}</h2>
            {avgColorDistance && (
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                        🎯 <strong>Average Color Distance:</strong> {avgColorDistance}
                    </p>
                </div>
            )}



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