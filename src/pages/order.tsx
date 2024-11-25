'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';
import '../globals.css';
import { CartItem } from '../app/model/cartItem';

export default function OrderPage() {
    const router = useRouter();
    const [order, setOrder] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('orderList');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
                setOrder(parsedCart);
            }
        }
    }, []);


    const calculateTotal = () => {
        return order
            .filter((item) => item.isSelected)
            .reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return(
        <div>
            <div className="flex h-[100%] w-[100%] pt-[10vh]">
                <div className="fixed top-10 left-10">
                    <button type="button" onClick={()=>router.back()} className="hover:opacity-70">
                        <SlActionUndo size={40}/>
                    </button>
                </div>
                <div className="fixed top-20">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        onClick={() => router.push('/')}
                    >
                        返回首頁
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <h1>結帳</h1>
            </div>
            {order.map((item, index) => (
                <div key={index} className='flex justify-center items-center'>
                    <span title={item.product.name}>
                        {item.product.name}-{item.quantity}
                    </span>
                </div>
            ))}
            <div className='flex justify-center items-center flex-col'>
                {/* <h2 className="text-xl font-semibold mb-2">結算</h2> */}
                <p>總金額：NT${calculateTotal().toFixed(2)}</p>
            </div>
        </div> 
    );
}