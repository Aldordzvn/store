import { Component } from '@angular/core';
import { FacadeLandingService } from '../services/facade-landing.service';
import { Producto } from '../model/producto.model';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  producto$: Observable<Producto>;
  titleParts$ : Observable<{lastWord: string, restTitle: string}>;

  constructor(private facadeLanding: FacadeLandingService) {
    this.producto$ = this.facadeLanding.getProducto;
    this.titleParts$ = this.facadeLanding.titleParts$;
  }

}
