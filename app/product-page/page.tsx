'use client'

import React, { useEffect, useState } from 'react';

const getProductFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return {
            title: localStorage.getItem('title') || '預設標題',
            categories: localStorage.getItem('categories') || '預設分類',
            description: localStorage.getItem('description') || '預設描述',
            price: localStorage.getItem('price') || '預設價格',
            image: localStorage.getItem('image') || '/default-image.png'
        };
    }
    return {
        title: '預設標題',
        categories: '預設分類',
        description: '預設描述',
        price: '預設價格',
        image: '/default-image.png'
    };
};

export default function detailProduct(){
    const [product, setProduct] = useState(getProductFromLocalStorage());

    useEffect(() => {
        setProduct(getProductFromLocalStorage());
    }, []);
    return (
        <div className="flex h-[100%] w-[100%] items-center pt-[10vh]">
            <div className="flex-col basis-1/2 pl-[15vw]">
                <img src={product.image} className="h-[70vh] rounded-lg"/>
            </div>
            <div className="flex-col basis-1/2 pr-[10vw]">
                <h1 className="text-[4em] font-bold">{product.title}</h1>
                <div className="text-[3em] text-red-700 font-bold">{product.price} <span className="text-[0.5em]">元</span> </div>
                <div>{product.description}</div>
                <button className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60">add to cart</button>
            </div>
        </div>
    );
}