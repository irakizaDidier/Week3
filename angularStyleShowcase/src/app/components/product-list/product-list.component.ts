import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false; 
      },
    });
  }

  truncateText(text: string, wordLimit: number): string {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  }
}
