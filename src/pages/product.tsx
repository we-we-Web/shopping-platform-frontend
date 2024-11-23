'use client'

import React, { useEffect, useState } from 'react';
import Product from '../app/model/product';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';

export default function ProductContent(){
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getProduct = async(id: string) => {
            const url = `https://dongyi-api.hnd1.zeabur.app/products/${id}`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    setProduct(result);
                    console.log(`Get product ${id} successfully`);
                } else {
                    console.error('failed to fetch:', response.status);
                }
            } catch(err) {
                console.error('error:', err);
            }
        }
        const productID = localStorage.getItem("product");
        if (!productID) {
            console.error("failed to get product id from local storage.");
            // TODO
            router.push('/');
            return ;
        }
        getProduct(productID);
    }, []);

    useEffect(() => {
        if(product?.name){
            document.title = product.name;
        }
    }, [product]);
    
    const addtoCart = () => {
        // localStorage.removeItem("cartList");
        // let arr: { [key: string]: number } = {};
        let arr = new Map<string,number>();
        if (localStorage.getItem("cartList") == null) {
            if(product) arr.set(product.id,1);
            localStorage.setItem("cartList", JSON.stringify(arr));
        } else {
            const cardList = localStorage.getItem("cartList");
            arr = cardList ? JSON.parse(cardList) : {};
            if(product){
                if(arr.has(product.id)) arr.set(product.id, (arr.get(product.id) ?? 0) + 1);
                else arr.set(product.id,1);
            }
            localStorage.setItem("cartList", JSON.stringify(arr));
        }
        alert("Add to cart successfully : "+product?.name);
        // console.log(product);
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