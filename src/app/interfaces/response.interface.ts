import { CartItemComponent } from "../components/cart-item/cart-item.component";
import CartInterface from "./cart.interface";
import CartItemInterface from "./cartItem.interface";
import CategoryInterface from "./category.interface";
import OrderInterface from "./order.interface";
import ProductInterface from "./product.interface";
import UserInterface from "./user.interface";

export default interface ResponseInterface{

    err: boolean
    msg?: string
    exists?: boolean
    user?: UserInterface 
    tokenData?: object
    categories?: CategoryInterface[]
    products?: ProductInterface[]
    productsCount?: number
    productItem?: ProductInterface
    openCart?: CartInterface
    cartItems?: CartItemInterface[]
    totalCartPrice?: number
    numberOfOrders?: number
    lastOrder?: OrderInterface
    newOrder?: OrderInterface

}