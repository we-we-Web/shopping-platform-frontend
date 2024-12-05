'use client'

import React, { useEffect, useState } from 'react';
import Product from '../app/model/product';
import { useRouter } from 'next/navigation';
import NavigationBar from '../app/component/NavigationBar';
import Image from 'next/image';
import '../globals.css';

export default function ProductContent() {
    const [product, setProduct] = useState<Product | null>(null);
    const [productNum, setProductNum] = useState(1);
    const [addingBtnText, setAddingBtnText] = useState('Add to Cart');
    const router = useRouter();

    useEffect(() => {
        const getProduct = async(id: string) => {
            const url = `https://dongyi-api.hnd1.zeabur.app/product/products/${id}`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    setProduct(result);
                    console.log(`Get product ${id} successfully`);
                } else {
                    console.error('failed to fetch:', response.status);
                }
            } catch(err) {
                console.error('error:', err);
            }
        }

        const productID = localStorage.getItem("product");
        if (!productID) {
            console.error("failed to get product id from local storage.");
            // TODO
            router.push('/');
            return ;
        }
        getProduct(productID);
    }, []);

    useEffect(() => {
        if (product?.name) {
            document.title = product.name;
        }
    }, [product]);
    
    const addtoCart = async(id: string) => {
        const url = `https://dongyi-api.hnd1.zeabur.app/cart/api/item-upd`;
        const request = {
            id: id,
            product: `${product?.id}`,
            delta: productNum,
            remaining: product?.remain_amount,
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

    if (!product) return <p>Loading...</p>;
    return (
        <div className="flex h-[100%] w-[100%] pt-[10vh]">
            <NavigationBar />
            <div className='flex m-8'>
                <Image 
                    src={product.image ?? "/default.png"}
                    className='mr-[5vw] border-gray-400 border object-contain'
                    alt={product.name}
                    width={800}
                    height={800}
                />
                <div className="flex-col pr-[10vw]">
                    <h1 className="text-[4em] font-bold">{product.name}</h1>
                    <div className="text-[3em] text-red-700 font-bold">
                        {product.price} 
                        <span className="text-[0.5em]">元</span> 
                    </div>
                    <div>{product.description}</div>
                    <div className="flex flex-col mt-16">
                        <div className="flex items-center justify-center w-36 m-0">
                            <button onClick={minus} className="flex items-center justify-center w-8 h-8 
                                                            bg-gray-200 hover:bg-gray-400 text-[2em]">
                                -
                            </button>
                            <span className="w-20 text-center">{productNum}</span>
                            <button onClick={add} className="flex items-center justify-center 
                                                            w-8 h-8 bg-gray-200 hover:bg-gray-400 text-[2em]">
                                +
                            </button>
                        </div>
                        <button 
                            className="bg-[#9F79EE] w-36 h-[2em] text-white mt-0 hover:opacity-60" 
                            onClick={() => addtoCart(`demo@gmail.com`)}>
                            {addingBtnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
