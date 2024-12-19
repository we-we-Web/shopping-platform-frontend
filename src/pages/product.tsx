'use server'

import React, { useEffect, useState } from 'react';
import Product from '../app/model/product';
import NavigationBar from '../app/component/NavigationBar';
import '../globals.css';
import { GetServerSideProps } from 'next';
import { UserProfile } from '../app/model/userProfile';
import { jwtDecode } from 'jwt-decode';
import LoginPopup from '../app/component/LoginPopup';
import Loading from '../app/component/Loading';
import ProductImage from '../app/component/ProductImage';

export const getServerSideProps: GetServerSideProps = async(context) => {
    const ProductId = context.query!;
    try {
        const url = `https://dongyi-api.hnd1.zeabur.app/product/api/product/${ProductId.id}`;
        const response = await fetch(url);
        if (response.ok) {
            const product: Product = await response.json();
            console.log(`Get product ${ProductId.id} successfully`);
            return { props: { product } };
        } else {
            console.error('failed to fetch:', response.status);
            return { props: {} };
        }
    } catch(err) {
        console.error('error:', err);
        return { props: {} };
    }
}

export default function ProductContent({ product }: { product: Product }) {
    const [email, setEmail] = useState('');
    const [productNum, setProductNum] = useState(1);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [addingBtnText, setAddingBtnText] = useState('Add to Cart');
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const sizeOrder = ['S','M','L','XL'];
    useEffect(() => {
        document.body.style.overflow = isLoginOpen ? 'hidden' : 'auto';
    }, [isLoginOpen]);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            try {
                const {email}: UserProfile = jwtDecode(token);
                setEmail(email);
            } catch (error) {
                console.error("無效的 JWT:", error);
                localStorage.removeItem('access-token');
            }
        }
    }, []);

    useEffect(() => {
        if (product?.name) {
            document.title = product.name;
        }
    }, [product]);
    
    const addtoCart = async(id: string) => {
        if (id === '') {
            setLoginOpen(true);
        }
        const url = `https://dongyi-api.hnd1.zeabur.app/cart/api/item-upd`;
        const request = {
            id: id,
            product: `${product?.id}`,
            size: selectedSize,
            delta: productNum,
            remaining: product.size[selectedSize!],
        }
        console.log('request body:', request);
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setAddingBtnText('Successfully!');
                setTimeout(() => {
                    setAddingBtnText('Add to Cart');
                }, 600);
                return ;
            } else if (response.status === 404) {
                console.log('cart not found');
            } else {
                console.log('failed to upd cart:', response.status);
            }
        } catch (err) {
            console.error('error:', err);
        }
        setAddingBtnText('Failed...');
        setTimeout(() => {
            setAddingBtnText('Add to Cart');
        }, 600);
    };

    const add = () => {
        setProductNum(productNum+1);
    }
    const minus = () => {
        if(productNum <= 2) setProductNum(1);
        else setProductNum(productNum-1);
    }
    // const sizeEntries = product.size ? Object.entries(product.size).filter(([key, value]) => Number(value) > 0) : [];
    const sortDictionaryByKeys = (dict: { [key: string]: number }, order: string[]) => {
        const sortedEntries = Object.entries(dict).sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
        return Object.fromEntries(sortedEntries);
    };
    const sortedSizes = sortDictionaryByKeys(product.size, sizeOrder);
    console.log('product:', product.size);
    if (!product) return <Loading/>;
    return (
        <div className="flex h-[100%] w-[100%] pt-[10vh]">
            <NavigationBar />
            <div className='flex m-8'>
                <ProductImage id={product.id} name={product.name} isIndex={false} />
                <div className="flex-col ml-10 space-y-6">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <div className="text-2xl font-bold text-red-600">NT${product.price}</div>
                    <div className="flex flex-col mt-16">
                    <div>
                            <h4>
                                尺寸：{selectedSize ? <span>{selectedSize}</span> : '未選擇'}
                            </h4>
                            <div className="flex">
                                {sortedSizes ? (
                                    Object.entries(sortedSizes).map(([size, quantity]) => (
                                        <button 
                                            key={size} 
                                            className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center m-1 cursor-pointer
                                                        ${selectedSize === size ? 'border-[#9F79EE] text-[#9F79EE]':'border-gray-400 text-gray-400 hover:border-[#9F79EE] hover:text-[#9F79EE]'}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-gray-500">目前無尺寸可選擇</span>
                                )}
                            </div>
                    </div>
                        <div className="flex items-center justify-center w-36 m-0">
                            <button onClick={minus} className="flex items-center justify-center w-8 h-8 
                                                             hover:text-[#9F79EE] text-[2em]">
                                -
                            </button>
                            <span className="w-20 text-center">{productNum}</span>
                            <button onClick={add} className="flex items-center justify-center 
                                                            w-8 h-8 hover:text-[#9F79EE] text-[2em]">
                                +
                            </button>
                        </div>
                        <button 
                            className="bg-[#9F79EE] w-36 h-[2em] text-white mt-0 hover:opacity-60" 
                            onClick={() => addtoCart(email)}>
                            {addingBtnText}
                        </button>
                    </div>
                </div>
            </div>
            {isLoginOpen &&
                <LoginPopup
                    onClose={() => setLoginOpen(false)} 
                />
            }
        </div>
    );
}
