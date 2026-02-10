import { Injectable } from '@angular/core';
import { FakeApiService } from '../fake-api.service';
import { BehaviorSubject, Observable, shareReplay, take } from 'rxjs';
import { Producto } from '../../model/producto.model';

type SortOption = | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | null;

@Injectable({
  providedIn: 'root'
})
export class FacadeProductsPageService {
  allProducts$: Observable<Producto[]>;
  private selectedCategories = new Set<string>();
  private readonly filteredProductsSubject = new BehaviorSubject<Producto[]>([]);
  readonly filteredProducts$ = this.filteredProductsSubject.asObservable();
  private selecetFilter : SortOption = null;

  constructor(private fakeApi:FakeApiService) {
    this.allProducts$ = this.fakeApi.getProducts().pipe(shareReplay(1));
    this.allProducts$.subscribe(products =>{
      this.filteredProductsSubject.next(products)
    })
  }

  toggleCategory(category: string){
    if(this.selectedCategories.has(category)){
      this.selectedCategories.delete(category);
    } else{
      this.selectedCategories.add(category);
    }
  }

  setSort(sort: SortOption){
    this.selecetFilter = sort;
    this.applyFilter();
  }

  // applyFilter(){
  //   this.allProducts$.pipe(take(1)).subscribe(product =>{
  //     if(this.selectedCategories.size === 0){
  //       this.filteredProductsSubject.next(product);
  //       return;
  //     }
      
  //     const filtered = product.filter(product => this.selectedCategories.has(product.category));
  //     this.filteredProductsSubject.next(filtered);
  //   });
  // }

  applyFilter(){
    this.allProducts$.pipe(take(1)).subscribe(products =>{
      let result = [...products];

      if(this.selectedCategories.size > 0){
        result = result.filter(product => this.selectedCategories.has(product.category));
      }

      switch(this.selecetFilter){
        case 'price-asc':
          result.sort((a,b) => a.price - b.price);
          console.log("Entro aqui");
          break;
        case 'price-desc':
          result.sort((a,b) => b.price - a.price);
          break;
        case 'rating-asc':
          result.sort((a,b) => a.rating.rate - b.rating.rate);
          break;
        case 'rating-desc':
          result.sort((a,b) => b.rating.rate - a.rating.rate);
          break;
      }

      this.filteredProductsSubject.next(result);
    })
  }

}
