import React from 'react';
import data from './good/data';

// 顯示星等函數
const getStarRating = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    return (
        <div className="flex items-center">
            {[...Array(filledStars)].map((_, index) => (
                <span key={`filled-${index}`} className="text-yellow-400 text-lg">
                    ★
                </span>
            ))}
            {halfStar === 1 && (
                <span className="text-yellow-400 text-lg">☆</span>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300 text-lg">
                    ☆
                </span>
            ))}
        </div>
    );
};

function Home() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">商品列表</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={product.image || '/default-image.png'}
                            alt={product.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{product.title}</h2>
                            <p className="text-gray-500">{product.categories}</p>
                            {!product.discount && (
                                <p className="text-black font-bold text-xl mt-2">
                                    {product.price}元
                                </p>
                            )}
                            {product.discount && (
                                <div className="mt-1">
                                    <p className="text-gray-500 line-through text-xl">
                                        {product.price}元
                                    </p>
                                    <p className="text-red-500 font-bold text-xl">
                                        {product.price - product.discount}元
                                        <span className="text-red-500 text-x1 ml-2">
                                            {product.discount}% off
                                        </span>
                                    </p>
                                </div>
                            )}
                            {/* 顯示評價星等 */}
                            {product.rating && (
                                <div className="mt-2">
                                    {getStarRating(product.rating)}
                                    <p className="text-sm text-gray-500 mt-1">{product.rating} / 5</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
