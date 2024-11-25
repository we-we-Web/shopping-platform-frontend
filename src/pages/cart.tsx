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
    const [isLoading, setLoading] = useState(true); // 新增 loading 狀態

    // ** 初始化時從 local storage 加載購物車資料 **
    useEffect(() => {
        const createCart = async(id: string) => {
            const url = `https://dongyi-api.hnd1.zeabur.app/cart/api/cart-create`;
            const request = {
                id: id,
            }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('create cart successfully');
                    return result;
                } else {
                    console.log('failed to create cart:', response.status);
                }

            } catch (err) {
                console.error('error:', err);
            }
        }
        const getCart = async(id: string) => {
            const url = `https://dongyi-api.hnd1.zeabur.app/cart/api/cart-get`;
            const request = {
                id: id,
            }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('get cart successfully');
                    return await result;
                } else if (response.status === 404) {
                    console.log('cart not found so create the cart');
                    const result = createCart(id);
                    return result;
                } else {
                    console.log('failed to fetch cart:', response.status);
                }

            } catch (err) {
                console.error('error:', err);
            }
        }
        const getProduct = async(id: string) => {
            const url = `https://dongyi-api.hnd1.zeabur.app/product/products/${id}`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    console.log(`Get product ${id} successfully`);
                    return result;
                } else {
                    console.error('failed to fetch:', response.status);
                }
            } catch(err) {
                console.error('error:', err);
            }
        }
        const setupCart = async(id: string) => {
            interface productItemProps {
                product: string
                quantity: number
            }
            
            const cartModel = await getCart(id); // 用 cart id fetch cart model

            const cartProducts: productItemProps[] = cartModel.products; // set up cart products 只需要 cart model 的 products props

            const cartItems: CartItem[] = await Promise.all(
                cartProducts.map(async (productItem) => {
                    const product = await getProduct(productItem.product);
                    return {
                        product: product, 
                        quantity: productItem.quantity,
                        isSelected: false,
                    } as CartItem;
                })
            );

            setCart(cartItems);
            setLoading(false);
        }
        const id = `demo@gmail.com`;
        setupCart(id);
    }, []);

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);

    // 增加或減少商品數量
    const updateQuantity = (productId: string, delta: number) => {
        setCart(
            cart.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    // 勾選商品是否要結帳
    const toggleCheckout = (productId: string) => {
        setCart(
            cart.map((item) =>
                item.product.id === productId
                    ? { ...item, isSelected: !item.isSelected }
                    : item
            )
        );
    };

    // 將商品加入或移出「喜愛清單」
    // const toggleFavorite = (productId: string) => {
        // setCart(
        //     cart.map((item) =>
        //         item.product.id === productId.toString()
        //             ? { ...item, isFavorite: !item.isFavorite }
        //             : item
        //     )
        // );
    // };

    // 移除商品
    const removeFromCart = (productId: string) => {
        setCart(cart.filter((item) => item.product.id !== productId.toString()));
        // console.log(cart);
        // localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(cart.filter((item) => item.product.id !== productId)));
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
            .filter((item) => item.isSelected)
            .reduce((total, item) => total + item.product.price * item.quantity, 0) * (1 - discount);
    };


    // 新增訂單清單至 local storage
    const addOrderlist = () => {    
        let arr: CartItem[];
        localStorage.removeItem("orderList");
        if (localStorage.getItem("orderList") == null) {
            arr = cart.filter((item) => item.isSelected);
            localStorage.setItem("orderList", JSON.stringify(arr));
        } else {
            const orderList = localStorage.getItem("orderList");
            arr = orderList ? JSON.parse(orderList) : [];
            arr = cart.filter((item) => item.isSelected);
            localStorage.setItem("orderList", JSON.stringify(arr));
        }
        // console.log(arr);
    };

    if (isLoading) {
        return <div className="p-6">Loading...</div>; // 加載提示
    }

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
                                        onChange={() => toggleCheckout(item.product.id)}
                                        checked={item.isSelected}
                                    />
                                    <Link href="product" onClick={() => localStorage.setItem('product', JSON.stringify(item.product.id))}>
                                        <span title={item.product.name}> {/* 顯示完整商品名稱 */}
                                            {item.product.name} - NT${item.product.price} x {item.quantity}
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                    >
                                        +
                                    </button>
                                    {/* <button
                                        className={`px-2 py-1 rounded ${
                                            item.isFavorite ? 'bg-yellow-500' : 'bg-gray-500'
                                        } text-white hover:bg-yellow-700`}
                                        onClick={() => toggleFavorite(item.id)}
                                    >
                                        {item.isFavorite ? '移除喜愛' : '加入喜愛'}
                                    </button> */}
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={() => removeFromCart(item.product.id)}
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
                        disabled={cart.every((item) => !item.isSelected)}
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