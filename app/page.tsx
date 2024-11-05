'use client';

import React, { useState, useEffect } from 'react';
import data from './good/data';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';

// 顯示星等函數
function getStarRating(rating: number) {
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

interface LoginPopupProps {
    onClose: () => void;
}
function LoginPopup({ onClose }: LoginPopupProps) {
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClickOutside}>
            <div className="bg-white p-8 rounded-lg w-80 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">登入</h2>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                        onClick={() => {
                            // Google login logic here
                            window.location.href = 'https://accounts.google.com/o/oauth2/auth';
                        }}
                    >
                        使用 Google 帳號登入
                    </button>
                </div>
                <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700 w-full text-center">
                    關閉
                </button>
            </div>
        </div>
    );
};

function Home() {
    const [isLoginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        if (isLoginOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoginOpen]);

    return (
        <div className="p-6 relative">
            {/* Profile button to open login popup */}
            <div className="absolute top-6 right-8">
                <button
                    onClick={() => setLoginOpen(true)}
                    className="flex items-center bg-gray-200 p-1.5 rounded-full hover:bg-gray-300"
                >
                    <FontAwesomeIcon icon={faUserRegular} className="text-gray-600 text-2xl" />
                </button>
            </div>

            { isLoginOpen && 
                <LoginPopup 
                    onClose={ () => setLoginOpen(false) }
                />
            }

            <h1 className="text-2xl font-bold mb-6">商品列表</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {data.map((product, index) => (
                    <Link href="product-page" key={index}>
                        <div
                            onClick={() => connectToProductPage(product)}
                            className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-slate-300 min-h-[300px] h-full cursor-pointer"
                        >
                            <img
                                src={product.image || '/default-image.png'}
                                alt={product.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <h2 className="text-lg font-bold">{product.title}</h2>
                                <p className="text-gray-500">{product.categories}</p>
                                {!product.discount ? (
                                    <p className="text-black font-bold text-xl mt-2">
                                        {product.price}元
                                    </p>
                                ) : (
                                    <div className="mt-1">
                                        <p className="text-gray-500 line-through text-xl">
                                            {product.price}元
                                        </p>
                                        <p className="text-red-500 font-bold text-xl">
                                            {(product.price * (1 - product.discount / 100)).toFixed(2)}元
                                            <span className="text-red-500 text-sm ml-2">
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
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
