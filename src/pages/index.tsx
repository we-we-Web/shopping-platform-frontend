'use client'

import React, { useEffect, useState } from 'react';
import ProductCard from '../app/component/ProductCard';
import Product from '../app/model/product';
import NavigationBar from '../app/component/NavigationBar';
import '../globals.css';


function Home() {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://dongyi-api.hnd1.zeabur.app/product/products';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    if (!data) {
        return <div className="p-6">無法獲取資料，請稍後再試。</div>; 
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