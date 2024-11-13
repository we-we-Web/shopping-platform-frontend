'use client'

import React, { useEffect, useState } from 'react';
import Product from '../model/product';

// const getProductFromLocalStorage = () => {
//     if (typeof window !== 'undefined') {
//         return {
//             title: localStorage.getItem('title') || '預設標題',
//             categories: localStorage.getItem('categories') || '預設分類',
//             description: localStorage.getItem('description') || '預設描述',
//             price: localStorage.getItem('price') || '預設價格',
//             image: localStorage.getItem('image') || '/default-image.png'
//         };
//     }
//     return {
//         title: '預設標題',
//         categories: '預設分類',
//         description: '預設描述',
//         price: '預設價格',
//         image: '/default-image.png'
//     };
// };


export default function ProductContent(){
    const [product, setProduct] = useState<Product | null>(null);
    
    useEffect(() => {
        const storedProduct = localStorage.getItem("product");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
            localStorage.setItem("product", "");
            
        }
    }, []);
    
    const addtoCart = () => {
        // localStorage.removeItem("cartList");
        let arr = [];
        if(localStorage.getItem("cartList") == null){
            arr.push(product);
            localStorage.setItem("cartList", JSON.stringify(arr));
        }
        else{
            const cardList = localStorage.getItem("cartList");
            arr = cardList ? JSON.parse(cardList) : [];
            arr.push(product);
            localStorage.setItem("cartList", JSON.stringify(arr));
        }
        console.log(product);
    };

    if (!product) return <p>Loading...</p>;
    return (
        <div className="flex h-[100%] w-[100%] items-center pt-[10vh]">
            <div className="flex-col basis-1/2 pl-[15vw]">
                <img src={product.image} className="h-[70vh] rounded-lg"/>
            </div>
            <div className="flex-col basis-1/2 pr-[10vw]">
                <h1 className="text-[4em] font-bold">{product.title}</h1>
                <div className="text-[3em] text-red-700 font-bold">{product.price} <span className="text-[0.5em]">元</span> </div>
                <div>{product.description}</div>
                <button className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60" onClick={addtoCart}>add to cart</button>
            </div>
        </div>
    );
}