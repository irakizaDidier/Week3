import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should emit pageChanged event when onPageChange is called', () => {
    jest.spyOn(component.pageChanged, 'emit');

    const page = 2;
    component.onPageChange(page);

    expect(component.pageChanged.emit).toHaveBeenCalledWith(page);
  });

  it('should render correct number of pages', () => {
    component.totalPages = 5;
    fixture.detectChanges();

    const pageButtons = fixture.debugElement.queryAll(By.css('.page-button'));
    expect(pageButtons.length).toBe(5);
  });

  it('should highlight the current page', () => {
    component.currentPage = 3;
    component.totalPages = 5;
    fixture.detectChanges();

    const currentPageButton = fixture.debugElement.query(
      By.css('.current-page')
    );
    expect(currentPageButton.nativeElement.textContent.trim()).toBe('3');
  });

  it('should call onPageChange when a page is clicked', () => {
    jest.spyOn(component, 'onPageChange');

    component.totalPages = 5;
    fixture.detectChanges();

    const pageButton = fixture.debugElement.queryAll(By.css('.page-button'))[1];
    pageButton.triggerEventHandler('click', null);

    expect(component.onPageChange).toHaveBeenCalledWith(2);
  });
});
