interface Product {
    id: number
    name: string
    price: number
    color: string
    size: string
    remain_amount: number
    image?: string
    description?: string
    discount?: number
    categories?: string
    rating?: number
}

export default Product;