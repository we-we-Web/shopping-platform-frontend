'use client'
import data from './good/data';
import React, { useEffect, useState } from 'react';
import ProductCard from './component/ProductCard';
import CartButton from './component/CartButton';
import LoginPopup from './component/LoginPopup';
import LoginButton from './component/LoginButton';

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
            <LoginButton onOpen={() => setLoginOpen(true)} />

            {isLoginOpen &&
                <LoginPopup
                    onClose={() => setLoginOpen(false)}
                />
            }

            <CartButton />

            <h1 className="text-2xl font-bold mb-6">商品列表</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {data.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Home;