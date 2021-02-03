export default interface OrderInterface{

    id: number
    user_id?: number
    cart_id?: number
    order_total_price?: number
    city?: string
    street?: string
    delivery_date?: Date
    closing_date?: Date
    credit_card?: number
}