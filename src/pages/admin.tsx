import React, { useState } from 'react';

function Admin() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [remainAmount, setRemainAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [discount, setDiscount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        
        const productData = {
            id,
            name,
            price,
            color,
            size,
            remain_amount: remainAmount,
            description: description || null,
            categories: categories || null,
            discount: discount || null,
        };

        try {
            const url = 'https://dongyi-api.hnd1.zeabur.app/product/products';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Details:", errorData); 
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'No message'}`);
            }

            const result = await response.json();
            setMessage(`Success! Product ID: ${result.product.id}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(`Error: ${err.message}`);
            } else {
                setMessage('Unknown error occurred');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id: </label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price: </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Color: </label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Size: </label>
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
                <div>
                    <label>Remaining Amount: </label>
                    <input
                        type="number"
                        value={remainAmount}
                        onChange={(e) => setRemainAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Categories: </label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                </div>
                <div>
                    <label>Discount: </label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </div>

                <button type="submit">Create Product</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Admin;
