"use client";

import React, { useState, useEffect } from 'react';
import data from '../good/data';

const ProductDetailPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        console.log('Loading data:', data); // 確認資料是否正確加載
        setProducts(data); // 設置為所有產品
    }, []);

    if (products.length === 0) {
        return <p>Loading...</p>; // 在資料未加載時顯示加載提示
    }

    return (
        <div className="product-detail-page">
            {products.map((product, index) => (
                <div key={index} className="product">
                    <div className="product-images">
                        <img
                            alt={product.title}
                            src={product.image}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="product-info">
                        <h1>Name: {product.title}</h1>
                        <p>Categories: {product.categories}</p>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <div className="purchase-options">
                            <label htmlFor={`quantity-${index}`}>Quantity:</label>
                            <input type="number" id={`quantity-${index}`} name="quantity" min="1" max="10" />
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductDetailPage;
