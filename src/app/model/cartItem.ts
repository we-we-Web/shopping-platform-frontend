import Product from "./product"

export interface CartItem {
    product: string
    quantity: number
    isSelected: boolean
}