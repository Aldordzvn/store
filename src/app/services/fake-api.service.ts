import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Producto } from '../model/producto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private readonly api = 'https://fakestoreapi.com/products';
  

  constructor(private httpClient: HttpClient) {
   }

  getProducts() : Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.api);
  }

  getProductsById(id: number) : Observable<Producto>{
    return this.httpClient.get<Producto>(`${this.api}/${id}`);
  }
  
}
