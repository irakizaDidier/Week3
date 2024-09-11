import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule, // Add CommonModule to use directives like *ngFor
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
