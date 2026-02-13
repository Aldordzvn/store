import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosPageComponent } from './productos-page/productos-page.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "products", component: ProductosPageComponent},
    {path: "productDetail/:id", loadComponent: () => import('./products-detail/products-detail.component').then(m => m.ProductsDetailComponent)},
    {path: "cart", component: ShoppingCartComponent}
];

