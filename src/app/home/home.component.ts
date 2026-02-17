import { Component } from '@angular/core';
import { FacadeLandingService } from '../services/facade-landing.service';
import { Producto } from '../model/producto.model';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductoTitulo } from '../model/ProductoTitulo.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faGem, faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../model/category.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  elecIcon = faLaptop;
  jewelIcon = faGem;
  menIcon = faPerson;
  womenIcon = faPersonDress;
  producto$: Observable<Producto>;
  titleParts$ : Observable<{lastWord: string, restTitle: string}>;
  // productosExhibicion$ : Observable<Producto[]>;
  fourProducts$ : Observable<(Producto & {titulo: ProductoTitulo})[]>;
  categories$: Observable<Category[]>;
  productsRating: Observable<Producto[]>

  constructor(private facadeLanding: FacadeLandingService, private router: Router) {
    this.producto$ = this.facadeLanding.producto$;
    this.titleParts$ = this.facadeLanding.titleParts$;
    // this.productosExhibicion$ = this.facadeLanding.exhibitionProducts;
    this.fourProducts$ = this.facadeLanding.exhibitionProducts;
    this.categories$ = facadeLanding.categories$;
    this.productsRating = facadeLanding.bestRating$;
  }

  
}
