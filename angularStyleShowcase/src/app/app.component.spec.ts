import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angularStyleShowcase'`, () => {
    expect(component.title).toBe('angularStyleShowcase');
  });

  it('should render title in the template', () => {
    fixture.detectChanges();
    const titleElement = compiled.querySelector('.content span');
    expect(titleElement?.textContent).toContain(
      'angularStyleShowcase app is running!'
    );
  });
});
