import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jest.Mocked<ProductService>;

  beforeEach(() => {
    // Mock ProductService
    mockProductService = {
      getProducts: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch products and set isLoading to false on success', () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 0,
          image: '',
          category: '',
          rating: {
            rate: 0,
            count: 0,
          },
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 0,
          image: '',
          category: '',
          rating: {
            rate: 0,
            count: 0,
          },
        },
      ];

      mockProductService.getProducts.mockReturnValue(of(mockProducts));

      component.ngOnInit();

      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(component.products).toEqual(mockProducts);
    });

    it('should handle errors and set isLoading to false on failure', () => {
      const error = new Error('Failed to fetch products');
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(console, 'error').mockImplementation(() => {});

      mockProductService.getProducts.mockReturnValue(throwError(() => error));

      component.ngOnInit();

      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching products:',
        error
      );
    });
  });

  describe('truncateText', () => {
    it('should truncate text correctly when word limit is exceeded', () => {
      const text = 'This is a long description that needs truncation.';
      const truncated = component.truncateText(text, 4);

      expect(truncated).toBe('This is a long...');
    });

    it('should return the original text when word limit is not exceeded', () => {
      const text = 'Short description';
      const truncated = component.truncateText(text, 4);

      expect(truncated).toBe(text);
    });

    it('should handle empty text gracefully', () => {
      const text = '';
      const truncated = component.truncateText(text, 4);

      expect(truncated).toBe('');
    });
  });
});
