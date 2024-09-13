import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockRenderer = {
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as unknown as Renderer2;

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: Renderer2, useValue: mockRenderer }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set dark theme if localStorage has "dark" theme', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue('dark');

      component.ngOnInit();

      expect(component.isDarkTheme).toBe(true);
      expect(mockRenderer.addClass).toHaveBeenCalledWith(
        document.body,
        'dark-theme'
      );
    });

    it('should set light theme if localStorage has no theme or light theme', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

      component.ngOnInit();

      expect(component.isDarkTheme).toBe(false);
      expect(mockRenderer.addClass).toHaveBeenCalledWith(
        document.body,
        'light-theme'
      );
    });
  });

  describe('toggleTheme', () => {
    it('should switch to dark theme if currently light', () => {
      component.isDarkTheme = false;

      component.toggleTheme();

      expect(component.isDarkTheme).toBe(true);
      expect(mockRenderer.addClass).toHaveBeenCalledWith(
        document.body,
        'dark-theme'
      );
      expect(mockRenderer.removeClass).toHaveBeenCalledWith(
        document.body,
        'light-theme'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should switch to light theme if currently dark', () => {
      component.isDarkTheme = true;

      component.toggleTheme();

      expect(component.isDarkTheme).toBe(false);
      expect(mockRenderer.addClass).toHaveBeenCalledWith(
        document.body,
        'light-theme'
      );
      expect(mockRenderer.removeClass).toHaveBeenCalledWith(
        document.body,
        'dark-theme'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });
});
