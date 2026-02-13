import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';
import { FacadeDetailsService } from '../services/productsDetail/facade-details.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShoppingCartService } from '../services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-products-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  readonly product$: Observable<Producto | null>;
  readonly relatedProducts$: Observable<Producto[] | null>;

  constructor(private facadeDetail: FacadeDetailsService, private route: ActivatedRoute, private shoppingCart: ShoppingCartService, private router: Router) {
    this.product$ = this.facadeDetail.product$;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facadeDetail.loadProducto(Number(id));
    }
    this.relatedProducts$ = facadeDetail.productsRelated$;
    console.log(this.relatedProducts$);
  }

  ngOnDestroy() {
    this.facadeDetail.clear();
  }

  addProductoToCart(producto: Producto) {
    this.shoppingCart.addProduct(producto);
  }

  toProductDetail(productId: number){
    this.router.navigate(['/productDetail', productId])
  }
}
