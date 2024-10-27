"use client";

import React, { useState } from 'react';
import data from '../good/data'; // 假設這是您的商品資料文件

const ProductDetailPage: React.FC = () => {
    // 假設展示 `data` 中的第一個商品，並確保有預設圖片
    const product = data[0] || {};
    const [selectedImage, setSelectedImage] = useState<string>(
        Array.isArray(product.image) ? product.image[0] : product.image || '/default-image.png'
    );

    const { title, categories, description, price, image, review } = product;

    return (
        <div className="product-detail-page" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {/* 圖片展示區 */}
            <div className="product-images">
                {Array.isArray(image) ? (
                    image.map((imgSrc: string, index: number) => (
                        <div key={index} style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', width: '100px', height: '100px' }}>
                            <img
                                src={imgSrc}
                                alt={`Product Image ${index + 1}`}
                                style={{ width: '100%', height: '100%', cursor: 'pointer', transition: 'transform 0.3s' }}
                                onClick={() => setSelectedImage(imgSrc)}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${imgSrc})`,
                                    backgroundSize: '200%',
                                    backgroundPosition: 'center',
                                    pointerEvents: 'none',
                                    transform: 'scale(0)',
                                    transition: 'transform 0.3s',
                                }}
                                className="zoom-lens"
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', width: '100px', height: '100px' }}>
                        <img
                            src={image || '/default-image.png'}
                            alt="Product Image"
                            style={{ width: '100%', height: '100%', transition: 'transform 0.3s' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${image || '/default-image.png'})`,
                                backgroundSize: '200%',
                                backgroundPosition: 'center',
                                pointerEvents: 'none',
                                transform: 'scale(0)',
                                transition: 'transform 0.3s',
                            }}
                            className="zoom-lens"
                        />
                    </div>
                )}
                {selectedImage && (
                    <div className="main-image" style={{ marginTop: '10px' }}>
                        <img src={selectedImage} alt="Selected Product" style={{ width: '300px', height: 'auto' }} />
                    </div>
                )}
            </div>


            {/* 商品資訊區 */}
            <div className="product-info" style={{ flex: '1', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <h1 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{title}</h1>
                <p style={{ fontSize: '1em', color: '#555' }}>Categories: {categories}</p>
                <p style={{ fontSize: '1em', color: '#333', marginTop: '10px' }}>{description}</p>
                <p style={{ fontSize: '1.2em', color: '#e60023', fontWeight: 'bold', marginTop: '10px' }}>Price: ${price}</p>
                <p style={{ fontSize: '1em', color: '#555' }}>Review: {review}</p>
                <div className="purchase-options" style={{ marginTop: '15px' }}>
                    <label htmlFor="quantity" style={{ fontSize: '1em', color: '#555' }}>Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="10" style={{ marginLeft: '10px', padding: '5px' }} />
                    <button style={{ display: 'block', marginTop: '15px', padding: '10px 20px', backgroundColor: '#e60023', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
