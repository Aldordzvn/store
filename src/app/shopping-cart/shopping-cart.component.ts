import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome'; 
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
  totalPrice$: Observable<number>
  constructor(private cartService: ShoppingCartService){
    this.productos = cartService.cart$;
    this.totalPrice$ = cartService.cartTotal$;
  }

  decreaseProduct(id: number){
    this.cartService.decreaseProduct(id);
  }

  increaseProduct(id: number){
    this.cartService.increaseProduct(id);
  }

  deleteProduct(id: number){
    this.cartService.removeProduct(id);
  }
}
