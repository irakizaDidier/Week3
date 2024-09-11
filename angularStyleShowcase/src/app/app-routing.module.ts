import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./components/product-list/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/main-content/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/about/about.module').then((m) => m.AboutModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
