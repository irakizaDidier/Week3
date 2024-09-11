import { Component } from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 29.99,
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 49.99,
    },
    {
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 19.99,
    },
  ];
}
