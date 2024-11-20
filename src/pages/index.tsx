'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from '../app/component/ProductCard';
import CartButton from '../app/component/CartButton';
import LoginPopup from '../app/component/LoginPopup';
import LoginButton from '../app/component/LoginButton';
import Product from '../app/model/product';
import '../globals.css';
import NavigationBar from '../app/component/NavigationBar';

function Home() {
    const [data, setData] = useState<Product[]>([]); // 將初始值設為 null
    const [isLoading, setLoading] = useState(true); // 新增 loading 狀態
    const [isLoginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://dongyi-api.hnd1.zeabur.app/products';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result); // 將結果儲存到狀態中
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false); // 結束加載狀態
            }
        };
        fetchData();
    }, [data]);

    useEffect(() => {
        document.body.style.overflow = isLoginOpen ? 'hidden' : 'auto';
    }, [isLoginOpen]);

    // 在渲染前檢查 data 和 isLoading
    if (isLoading) {
        return <div className="p-6">Loading...</div>; // 加載提示
    }

    if (!data) {
        return <div className="p-6">無法獲取資料，請稍後再試。</div>; // 當 data 為 null 時的提示
    }

    return (
        <>
            <NavigationBar />
            <div className="p-6 relative mt-16"> 
                <h1 className="text-2xl font-bold mb-6">商品列表</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {data.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;