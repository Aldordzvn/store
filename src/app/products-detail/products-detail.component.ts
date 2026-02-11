import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';
import { FacadeDetailsService } from '../services/productsDetail/facade-details.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  imports: [CommonModule],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  readonly product$: Observable<Producto | null>;
  readonly relatedProducts$ : Observable<Producto[] | null>;
  
  constructor(private facadeDetail : FacadeDetailsService, private route: ActivatedRoute){
    this.product$ = this.facadeDetail.product$;
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.facadeDetail.loadProducto(Number(id));
    }
    this.relatedProducts$ = facadeDetail.productsRelated$;
    console.log(this.relatedProducts$);
  }

  ngOnDestroy(){
    this.facadeDetail.clear();
  }
}
