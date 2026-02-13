import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';
import { FacadeDetailsService } from '../services/productsDetail/facade-details.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShoppingCartService } from '../services/shoppingCart/shopping-cart.service';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faCircleCheck, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-detail',
  imports: [CommonModule, RouterLink, FaIconComponent],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  cartIcon = faCartShopping;
  openModal : boolean = false;
  readonly product$: Observable<Producto | null>;
  readonly relatedProducts$: Observable<Producto[] | null>;

  constructor(private facadeDetail: FacadeDetailsService, private route: ActivatedRoute, private shoppingCart: ShoppingCartService, private router: Router) {
    this.product$ = this.facadeDetail.product$;
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.facadeDetail.loadProducto(Number(id));
    // }
    this.relatedProducts$ = facadeDetail.productsRelated$;
    console.log(this.relatedProducts$);
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.facadeDetail.loadProducto(Number(id));
      }
    });
  }

  ngOnDestroy() {
    this.facadeDetail.clear();
  }

  addProductoToCart(producto: Producto) {
    this.shoppingCart.addProduct(producto);
    this.openAddModal();
  }

  toProductDetail(productId: number){
    this.router.navigate(['/productDetail', productId])
  }

  openAddModal(){
    this.openModal = !this.openModal;
    if(this.openModal){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
  }

}
