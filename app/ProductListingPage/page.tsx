import React from 'react';
import data from '../good/data'; // 你的商品資料

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

const ProductListPage: React.FC = () => {
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
                            <p className="text-red-500 font-bold mt-2">
                                {product.price}元
                            </p>
                            {product.discount && (
                                <p className="text-green-500 text-sm mt-1">
                                    {product.discount}
                                </p>
                            )}
                            {/* 顯示評價星等 */}
                            {product.review && (
                                <div className="mt-2">
                                    {getStarRating(product.review)}
                                    <p className="text-sm text-gray-500 mt-1">{product.review} / 5</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
