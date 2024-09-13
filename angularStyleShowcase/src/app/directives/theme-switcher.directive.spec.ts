import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ThemeSwitcherDirective } from './theme-switcher.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <div [appThemeSwitcher]="theme">Test Theme</div> `,
})
class TestComponent {
  theme = 'light';
}

describe('ThemeSwitcherDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSwitcherDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    testElement = fixture.debugElement.query(
      By.directive(ThemeSwitcherDirective)
    ).nativeElement;
  });

  it('should apply "light-mode" class when theme is "light"', () => {
    fixture.componentInstance.theme = 'light';
    fixture.detectChanges();

    expect(testElement.classList.contains('light-mode')).toBe(true);
    expect(testElement.classList.contains('dark-mode')).toBe(false);
  });

  it('should apply "dark-mode" class when theme is "dark"', () => {
    fixture.componentInstance.theme = 'dark';
    fixture.detectChanges();

    expect(testElement.classList.contains('dark-mode')).toBe(true);
    expect(testElement.classList.contains('light-mode')).toBe(false);
  });

  it('should remove "dark-mode" class and apply "light-mode" class when switching from dark to light theme', () => {
    fixture.componentInstance.theme = 'dark';
    fixture.detectChanges();

    expect(testElement.classList.contains('dark-mode')).toBe(true);

    fixture.componentInstance.theme = 'light';
    fixture.detectChanges();

    expect(testElement.classList.contains('light-mode')).toBe(true);
    expect(testElement.classList.contains('dark-mode')).toBe(false);
  });
});
