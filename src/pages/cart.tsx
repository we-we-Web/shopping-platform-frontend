'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 使用 Next.js 的 useRouter 進行路由導航
import '../globals.css';
import Link from 'next/link';
import { CartItem } from '../app/model/cartItem';

export default function CartPage() {
    const router = useRouter();

    // 購物車狀態
    const [cart, setCart] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    // ** 初始化時從 local storage 加載購物車資料 **
    useEffect(() => {
        const storedCart = localStorage.getItem('cartList');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            const updatedCart = parsedCart.map((item: CartItem) => ({
                ...item,
                quantity: 1,
                isChecked: false,
                isFavorite: false,
            }));
            setCart(updatedCart);
        }
        // console.log(cart);
    }, []);

    // 增加或減少商品數量
    const updateQuantity = (productId: number, delta: number) => {
        setCart(
            cart.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    // 勾選商品是否要結帳
    const toggleCheckout = (productId: number) => {
        setCart(
            cart.map((item) =>
                item.id === productId
                    ? { ...item, isChecked: !item.isChecked }
                    : item
            )
        );
    };

    // 將商品加入或移出「喜愛清單」
    const toggleFavorite = (productId: number) => {
        setCart(
            cart.map((item) =>
                item.id === productId
                    ? { ...item, isFavorite: !item.isFavorite }
                    : item
            )
        );
    };

    // 移除商品
    const removeFromCart = (productId: number) => {
        setCart(cart.filter((item) => item.id !== productId));
        // console.log(cart);
        // localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(cart.filter((item) => item.id !== productId)));
    };

    // 使用折價券
    const applyCoupon = () => {
        if (coupon === 'DISCOUNT10') {
            setDiscount(0.1); // 10% 折扣
        } else {
            alert('無效的折價券');
        }
    };

    // 計算總金額
    const calculateTotal = () => {
        return cart
            .filter((item) => item.isChecked)
            .reduce((total, item) => total + item.price * item.quantity, 0) * (1 - discount);
    };


    // 新增訂單清單至 local storage
    const addOrderlist = () => {    
        let arr = [];
        localStorage.removeItem("orderList");
        if (localStorage.getItem("orderList") == null) {
            arr = cart.filter((item) => item.isChecked);
            localStorage.setItem("orderList", JSON.stringify(arr));
        } else {
            const orderList = localStorage.getItem("orderList");
            arr = orderList ? JSON.parse(orderList) : [];
            arr = arr.concat(cart.filter((item) => item.isChecked));
            localStorage.setItem("orderList", JSON.stringify(arr));
        }
        // console.log(arr);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">購物車頁面</h1>

            <div className="cart">
                <h2 className="text-xl font-semibold mb-2">購物車</h2>
                {cart.length === 0 ? (
                    <p>購物車是空的。</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="flex flex-col md:flex-row justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={item.isChecked}
                                        onChange={() => toggleCheckout(item.id)}
                                    />
                                    <Link href="product" onClick={() => localStorage.setItem('product', JSON.stringify(item))}>
                                        <span title={item.name}> {/* 顯示完整商品名稱 */}
                                            {item.name} - NT${item.price} x {item.quantity}
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className={`px-2 py-1 rounded ${
                                            item.isFavorite ? 'bg-yellow-500' : 'bg-gray-500'
                                        } text-white hover:bg-yellow-700`}
                                        onClick={() => toggleFavorite(item.id)}
                                    >
                                        {item.isFavorite ? '移除喜愛' : '加入喜愛'}
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        移除
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="coupon mt-4">
                <h2 className="text-xl font-semibold mb-2">使用折價券</h2>
                <input
                    type="text"
                    placeholder="輸入折價券"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={applyCoupon}
                >
                    確認
                </button>
            </div>

            <div className="checkout mt-4">
                <h2 className="text-xl font-semibold mb-2">結算</h2>
                <p>總金額：NT${calculateTotal().toFixed(2)}</p>
                <Link href="order">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                        disabled={cart.every((item) => !item.isChecked)}
                        onClick={() => {alert('前往結帳頁面');addOrderlist();}}
                    >
                        前往結帳
                    </button>
                </Link>
            </div>

            <div className="mt-4">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={() => router.push('/')}
                >
                    返回首頁
                </button>
            </div>
        </div>
    );
}