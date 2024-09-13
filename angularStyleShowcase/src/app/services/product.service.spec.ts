import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      price: 29.99,
      description: 'Description 1',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
      rating: { rate: 4.5, count: 10 },
      name: '',
    },
    {
      id: 2,
      price: 49.99,
      description: 'Description 2',
      category: 'Category 2',
      image: 'https://example.com/product2.jpg',
      rating: { rate: 4.8, count: 8 },
      name: '',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products from the API via GET', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);
  });

  it('should throw an error when the server returns a 500', () => {
    service.getProducts().subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');

    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
