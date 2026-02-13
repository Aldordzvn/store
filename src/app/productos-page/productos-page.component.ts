import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faChevronLeft, faL, faList } from '@fortawesome/free-solid-svg-icons';
import { FacadeProductsPageService } from '../services/productsPage/facade-products-page.service';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos-page',
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.scss'
})
export class ProductosPageComponent {
  listIcon = faList;
  abajoIcon = faAngleDown;
  leftArrow = faChevronLeft;
  categoryBoolean : boolean = false;
  filterBoolean : boolean = false;
  productos$: Observable<Producto[]>;

  constructor(public facadeProducts: FacadeProductsPageService, private route: ActivatedRoute, private router: Router) {
    this.productos$ = facadeProducts.filteredProducts$;
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if(category){ this.facadeProducts.initializeCategory(category);}
    });
  }

  ngOnDestroy(){
    this.facadeProducts.resetState();
    document.body.style.overflow = '';
  }

  openCategoryModal(){
    this.categoryBoolean = !this.categoryBoolean;
    if(this.categoryBoolean){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
  }

  onCheckBoxChange(category: string){
    this.facadeProducts.toggleCategory(category);
  }

  onSortChange(event: Event){
    const value = (event.target as HTMLSelectElement).value;
    this.facadeProducts.setSort(value as any);
  }

  onApply(){
    this.facadeProducts.applyFilter();
    this.categoryBoolean = false;
    document.body.style.overflow = '';
  }

  // toProductDetail(productId: number){
  //   this.router.navigate(['/product', productId])
  // }
}
