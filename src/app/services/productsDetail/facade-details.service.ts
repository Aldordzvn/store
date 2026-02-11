import { Injectable } from '@angular/core';
import { FakeApiService } from '../fake-api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Producto } from '../../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FacadeDetailsService {
  private readonly productSubject = new BehaviorSubject<Producto | null>(null);
  readonly product$ = this.productSubject.asObservable();
  private readonly relatedSubject = new BehaviorSubject<Producto[] | null>(null);
  readonly productsRelated$ = this.relatedSubject.asObservable();

  constructor(private fakeApi: FakeApiService) {
  }


  loadProducto(id: number){
    this.fakeApi.getProductsById(id).subscribe(product => {
      this.productSubject.next(product);
      this.loadRelated(product);
    });
  }

  loadRelated(producto: Producto){
    this.fakeApi.getProductByCategory(producto.category).pipe(
      map(products =>
        products.filter(p => p.id !== producto.id).slice(0,4)
      )
    ).subscribe(related => {
      this.relatedSubject.next(related);
    });
  }

  clear(){
    this.productSubject.next(null);
  }
}
