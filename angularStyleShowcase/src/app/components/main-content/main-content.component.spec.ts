import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MainContentComponent } from './main-content.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let mockProductService: jest.Mocked<ProductService>;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    TestBed.configureTestingModule({
      declarations: [MainContentComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getProducts from ProductService and assign products$', () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Product 1 Description',
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
          description: 'Product 2 Description',
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
      component.products$?.subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });
      expect(mockProductService.getProducts).toHaveBeenCalled();
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
