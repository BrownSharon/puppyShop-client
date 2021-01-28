import { CartItemComponent } from "../components/cart-item/cart-item.component";
import CartInterface from "./cart.interface";
import CartItemInterface from "./cartItem.interface";
import CategoryInterface from "./category.interface";
import CityInterface from "./city.interface";
import OrderInterface from "./order.interface";
import ProductInterface from "./product.interface";
import TokenInterface from "./token.interface";
import UserInterface from "./user.interface";

export default interface ResponseInterface{

    err: boolean
    msg?: string
    status?: number
    exists?: boolean
    user?: UserInterface 
    token?: TokenInterface
    refreshToken?: TokenInterface
    categories?: CategoryInterface[]
    products?: ProductInterface[]
    productsCount?: number
    productItem?: ProductInterface
    openCart?: CartInterface
    cartItems?: CartItemInterface[]
    totalCartPrice?: any
    newCart?: CartInterface
    cart?: CartInterface
    numberOfOrders?: number
    lastOrder?: OrderInterface
    newOrder?: OrderInterface
    cities?: CityInterface[]
    error?: string
}