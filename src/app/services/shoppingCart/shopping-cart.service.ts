import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { Producto } from '../../model/producto.model';
import { CartItem } from '../../model/cartItem.model';
import { FakeApiService } from '../fake-api.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  readonly cart$ = this.cartSubject.asObservable();
  readonly cartTotal$ = this.cart$.pipe(map(cart => cart.reduce((total, item)=> total + item.totalPrice!, 0)));

  constructor(private fakeApi: FakeApiService) { }

  addProduct(product: Producto){
    const currentCart = [...this.cartSubject.value];

    const existingItem = currentCart.find( item => item.product.id == product.id);

    if(existingItem){
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
    }else{
      currentCart.push({
        product,
        quantity: 1,
        totalPrice: product.price
      });
    }
    this.updateCart(currentCart);
  }

  removeProduct(productId: number){
    const updatedCart = this.cartSubject.value.filter( item => item.product.id !== productId);
    this.updateCart(updatedCart);
  }

  updateQuantity(productId: number, quantity: number){
    const currentCart = [...this.cartSubject.value];
    const item = currentCart.find( item => item.product.id === productId);
    if(!item) return;
    item.quantity = quantity;

    if(item.quantity <= 0){
      this.removeProduct(productId)
      return;
    }

    this.updateCart(currentCart);
  }

  private updateCart(cart: CartItem[]){
    this.cartSubject.next(cart);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }

  private loadFromStorage(): CartItem[]{
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  decreaseProduct(productId: number){
    const currentCart = [...this.cartSubject.value];
    const existingItem = currentCart.find(item => item.product.id === productId);
    if(!existingItem) return; 
    existingItem.quantity -= 1;
    
    if(existingItem.quantity <= 0){
      const updatedCart = currentCart.filter( item => item.product.id !== productId);
      this.updateCart(updatedCart);
      return;
    }
    
    existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
    this.updateCart(currentCart);

  }

  increaseProduct(productId: number){
    const currentCart = [...this.cartSubject.value];
    const existingItem = currentCart.find(item => item.product.id === productId);
    if(!existingItem) return;
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
    this.updateCart(currentCart);
  } 

  clearCart(){
    this.updateCart([]);
  }
}
