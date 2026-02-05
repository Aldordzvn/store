import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Producto } from '../model/producto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private readonly api = 'https://fakestoreapi.com/products';
  private productos$ : BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);

  constructor(private httpClient: HttpClient) {
   }

  getProducts() : Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.api).pipe(
      tap(res => this.productos$.next(res)),
      tap(()=> console.log(this.api))
    );
  }

  getProductsById(id: number) : Observable<Producto>{
    return this.httpClient.get<Producto>(`${this.api}/${id}`);
  }
  
}
