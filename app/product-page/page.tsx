'use client'

import React, { useEffect, useState } from 'react';
import Product from '../model/product';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';

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
// 
export default function ProductContent(){
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedProduct = localStorage.getItem("product");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
        }
    }, []);
    useEffect(()=>{
        if(product?.title){
            document.title = product.title;
        }
    }, [product]);

    if (!product) return <p>Loading...</p>;
    return (
        <div className="flex h-[100%] w-[100%] pt-[10vh]">
            <div className="fixed top-10 left-10">
                <button type="button" onClick={()=>router.back()} className="hover:opacity-70">
                    <SlActionUndo size={40}/>
                </button>
            </div>
            <div className="flex basis-1/2 h-[75vh] items-center justify-end">
                <img src={product.image} className="rounded-lg max-h-[75vh] min-h-[50vh] pr-3"/>
            </div>
            <div className="flex-col basis-1/2 items-center">
                <h1 className="text-[4em] font-bold">{product.title}</h1>
                <div className="text-[3em] text-red-700 font-bold">{product.price} <span className="text-[0.5em]">元</span> </div>
                <div className="max-w-[40vw]">{product.description}</div>
                <button className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60">add to cart</button>
            </div>
        </div>
    );
}