import { Injectable } from '@angular/core';
import { FakeApiService } from './fake-api.service';
import { map, Observable, Subject, tap } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FacadeLandingService {
  private readonly productLanding : number = 7;
  private producto$ : Observable<Producto>
  titleParts$: Observable<{ restTitle: string; lastWord: string }>;


  constructor(private fakeApi: FakeApiService){
    this.producto$ = fakeApi.getProductsById(this.productLanding);
    this.titleParts$ = this.producto$.pipe(
      map(p =>{
        const words = p.title.split(' ');
        const lastWord = words.pop()!;
        const restTitle = words.join(' ');
        return { restTitle, lastWord};
      })
    );
  }

  get getProducto(){
    return this.producto$;
  }
}
