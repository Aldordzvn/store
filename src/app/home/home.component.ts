import { Component } from '@angular/core';
import { FacadeLandingService } from '../services/facade-landing.service';
import { Producto } from '../model/producto.model';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductoTitulo } from '../model/ProductoTitulo.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  producto$: Observable<Producto>;
  titleParts$ : Observable<{lastWord: string, restTitle: string}>;
  // productosExhibicion$ : Observable<Producto[]>;
  fourProducts$ : Observable<(Producto & {titulo: ProductoTitulo})[]>;

  constructor(private facadeLanding: FacadeLandingService) {
    this.producto$ = this.facadeLanding.producto$;
    this.titleParts$ = this.facadeLanding.titleParts$;
    // this.productosExhibicion$ = this.facadeLanding.exhibitionProducts;
    this.fourProducts$ = this.facadeLanding.exhibitionProducts;
  }

}
