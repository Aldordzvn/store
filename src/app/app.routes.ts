import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosPageComponent } from './productos-page/productos-page.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "products", component: ProductosPageComponent},
    {path: "productDetail/:id", loadComponent: () => import('./products-detail/products-detail.component').then(m => m.ProductsDetailComponent)}
];

