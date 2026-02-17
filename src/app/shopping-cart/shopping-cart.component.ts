import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../services/shoppingCart/shopping-cart.service';
import { CartItem } from '../model/cartItem.model';
import { Observable, tap } from 'rxjs';
import { Producto } from '../model/producto.model';


@Component({
  selector: 'app-shopping-cart',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  quitIcon = faXmark;
  productos: Observable<CartItem[]>;
  totalPrice$: Observable<number>;
  openModal : boolean = false;
  checkIcon = faCircleCheck;

  constructor(private cartService: ShoppingCartService) {
    this.productos = cartService.cart$;
    this.totalPrice$ = cartService.cartTotal$;
  }

  decreaseProduct(id: number) {
    this.cartService.decreaseProduct(id);
  }

  increaseProduct(id: number) {
    this.cartService.increaseProduct(id);
  }

  deleteProduct(id: number) {
    this.cartService.removeProduct(id);
  }

  buyCompleteModal() {
    this.openModal = !this.openModal;
    this.cartService.clearCart();
    if(this.openModal){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
