import { Producto } from "./producto.model";

export interface CartItem{
    product: Producto;
    quantity: number;
    totalPrice?: number;
}