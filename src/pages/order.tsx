'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlActionUndo } from 'react-icons/sl';
import '../globals.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    isChecked: boolean;
    isFavorite: boolean;
}

export default function OrderPage() {
    const router = useRouter();
    const [order, setOrder] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartList');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setOrder(parsedCart);
        }
    }, []);

    return(
        <div>
            <div className="flex h-[100%] w-[100%] pt-[10vh]">
                <div className="fixed top-10 left-10">
                    <button type="button" onClick={()=>router.back()} className="hover:opacity-70">
                        <SlActionUndo size={40}/>
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <h1>結帳</h1>
            </div>
            {order.map((item, index) => (
                <div key={index} className='flex justify-center items-center'>
                    <span title={item.name}>
                        {item.name}-{item.quantity}
                    </span>
                </div>
            ))}
        </div> 
    );
}