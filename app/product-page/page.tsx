'use client'

import React, { useEffect, useState } from 'react';
import Product from '../model/product';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';

export default function ProductContent(){
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedProduct = localStorage.getItem("product");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
            // localStorage.setItem("product", "");
            
        }
    }, []);
    useEffect(()=>{
        if(product?.title){
            document.title = product.title;
        }
    }, [product]);
    
    const addtoCart = () => {
        // localStorage.removeItem("cartList");
        let arr = [];
        if (localStorage.getItem("cartList") == null) {
            arr.push(product);
            localStorage.setItem("cartList", JSON.stringify(arr));
        } else {
            const cardList = localStorage.getItem("cartList");
            arr = cardList ? JSON.parse(cardList) : [];
            arr.push(product);
            localStorage.setItem("cartList", JSON.stringify(arr));
        }
        console.log(product);
    };

    if (!product) return <p>Loading...</p>;
    return (
        <div className="flex h-[100%] w-[100%] pt-[10vh]">
            <div className="fixed top-10 left-10">
                <button type="button" onClick={()=>router.back()} className="hover:opacity-70">
                    <SlActionUndo size={40}/>
                </button>
            </div>
            <div className="flex-col basis-1/2 pl-[15vw]">
                <img src={product.image || "./default.png"} className="h-[70vh] rounded-lg"/>
            </div>
            <div className="flex-col basis-1/2 pr-[10vw]">
                <h1 className="text-[4em] font-bold">{product.name}</h1>
                <div className="text-[3em] text-red-700 font-bold">{product.price} <span className="text-[0.5em]">元</span> </div>
                <div>{product.description}</div>
                <button className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60" onClick={addtoCart}>add to cart</button>
            </div>
        </div>
    );
}