import { Injectable } from '@angular/core';
import { FakeApiService } from './fake-api.service';
import { forkJoin, map, Observable, Subject, tap } from 'rxjs';
import { Producto } from '../model/producto.model';
import { ProductoTitulo } from '../model/ProductoTitulo.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class FacadeLandingService {
  private readonly productLanding: number = 7;
  producto$: Observable<Producto>;
  titleParts$: Observable<{ restTitle: string; lastWord: string }>;
  private readonly PRODUCTOSID = [3, 8, 12, 18];
  readonly exhibitionProducts: Observable<(Producto & {titulo: ProductoTitulo})[]>;
  categories$: Observable<Category[]>;

  constructor(private fakeApi: FakeApiService) {
    this.producto$ = fakeApi.getProductsById(this.productLanding);

    this.titleParts$ = this.producto$.pipe(
      map(p => {
        const words = p.title.split(' ');
        const lastWord = words.pop()!;
        const restTitle = words.join(' ');
        return { restTitle, lastWord };
      })
    );

    this.exhibitionProducts = forkJoin(
      this.PRODUCTOSID.map(id => this.fakeApi.getProductsById(id))
    ).pipe(
      map(productos =>
        productos.map(p => ({...p, titulo: this.separarTitulo(p.title)}))
      )
    );

    this.categories$ = fakeApi.getCategories();
  }

  private separarTitulo(title: string): ProductoTitulo {
    const words = title.trim().split(' ');
    const last = words.pop() ?? '';
    return { rest: words.join(' '), last};
  }



}
