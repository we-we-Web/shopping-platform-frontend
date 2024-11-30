'use client'

import React, { useEffect, useState } from 'react';
import ProductCard from '../app/component/ProductCard';
import Product from '../app/model/product';
import NavigationBar from '../app/component/NavigationBar';
import '../globals.css';

function Home() {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]); // 保存所有類別
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // 當前選中的類別
    const [filteredData, setFilteredData] = useState<Product[]>([]); // 篩選後的商品列表

    // 獲取商品資料
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://dongyi-api.hnd1.zeabur.app/product/products';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result: Product[] = await response.json();
                setData(result);
                setFilteredData(result); // 預設顯示所有商品

                // 提取唯一的 categories，並過濾掉 undefined
                const uniqueCategories: string[] = Array.from(
                    new Set(result.map((product) => product.categories).filter((category): category is string => category !== undefined))
                );
                setCategories(uniqueCategories);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 類別篩選處理
    const handleCategorySearch = () => {
        if (selectedCategory === '') {
            setFilteredData(data); // 如果未選擇類別，顯示所有商品
        } else {
            const filtered = data.filter(
                (product) => product.categories === selectedCategory
            );
            setFilteredData(filtered);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!filteredData.length) {
        return <div className="p-6">沒有符合條件的商品。</div>;
    }

    return (
        <>
            <NavigationBar />
            <div className="p-6 relative mt-16">
                <h1 className="text-2xl font-bold mb-6">商品列表</h1>

                {/* 下拉式選單選擇類別 */}
                <div className="mb-4 flex items-center">
                    <label htmlFor="categorySelect" className="mr-2 font-semibold">選擇類別:</label>
                    <select
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-[200px]"
                    >
                        <option value="">全部商品</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleCategorySearch}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80"
                    >
                        搜尋
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredData.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
