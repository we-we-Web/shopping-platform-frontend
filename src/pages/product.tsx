'use client'

import React, { useEffect, useState } from 'react';
import Product from '../app/model/product';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';
import NavigationBar from '../app/component/NavigationBar';

export default function ProductContent() {
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedProduct = localStorage.getItem('product');
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
        }
    }, []);

    useEffect(() => {
        if (product?.name) {
            document.title = product.name;
        }
    }, [product]);

    // 將商品加入購物車
    const addToCart = () => {
        let cartList = [];
        const storedCart = localStorage.getItem('cartList');

        if (storedCart) {
            cartList = JSON.parse(storedCart);
        }

        if (product) {
            cartList.push(product);
            localStorage.setItem('cartList', JSON.stringify(cartList));
        }

        console.log(product);
    };

    if (!product) return <p>Loading...</p>;
    return (
        <>
            <NavigationBar />
            <div className="flex h-[100%] w-auto pt-[10vh]">
                {/* 返回按鈕 */}
                <div className="fixed top-10 left-10">
                    <button 
                        type="button" 
                        onClick={() => router.back()} 
                        className="hover:opacity-70"
                    >
                        <SlActionUndo size={40} />
                    </button>
                </div>
                <div className="flex-col basis-1/2 pl-[15vw]">
                    <img 
                        src={product.image || './default.png'} 
                        className="max-h-[70vh] max-w-[100%] rounded-lg object-contain" 
                        alt={product.name || 'Product image'}
                    />
                </div>
                <div className="flex-col basis-1/2 pr-[10vw]">
                    <h1 className="text-[4em] font-bold">{product.name}</h1>
                    <div className="text-[3em] text-red-700 font-bold">
                        {product.price} <span className="text-[0.5em]">元</span>
                    </div>
                    <div>{product.description}</div>
                    <button 
                        className="bg-red-700 w-[10em] h-[2em] text-white mt-[5em] ml-[3em] hover:opacity-60" 
                        onClick={addToCart}
                    >
                        add to cart
                    </button>
                </div>
            </div>
        </>
    );
}
