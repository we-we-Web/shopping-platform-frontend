'use client'
import React, { Children } from 'react';
import data from './good/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from './component/ProductCard';
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

interface Product {
  title: string;
  categories: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
}

function connectToProductPage(good: Product) {
  // const value = document.querySelector('.text').value
  localStorage.setItem('title', good.title);
  localStorage.setItem('categories', good.categories);
  localStorage.setItem('description', good.description);
  localStorage.setItem('price', good.price.toString());
  localStorage.setItem('image', good.image);
  localStorage.setItem('rating', good.rating.toString());
  localStorage.setItem('review', good.rating.toString());
  // alert(good);
};


// const [data1, setData] = useState();

function Home() {
    // useEffect(() => {
    //     const fetchData = async() => {
    //         try {
    //             const url = 'https://dongyi.hnd1.zeabur.app/products';
    //             const response = await fetch(url);
    //             const result = await response.json();
    //             const newData = result; // 直接使用 result
    //             console.log(newData);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, [data]);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">商品列表</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((product, index) => (
                  <Link href="product-page" id= {`product-link ${index}`}
                      onClick={() => connectToProductPage(product)}
                      key={index}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
