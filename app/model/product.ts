interface Product {
    title: string;
    categories: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    discount?: number;
}

export default Product;