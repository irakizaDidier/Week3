import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appThemeSwitcher]',
})
export class ThemeSwitcherDirective {
  @Input('appThemeSwitcher') set theme(value: string) {
    if (value === 'dark') {
      this.el.nativeElement.classList.add('dark-mode');
      this.el.nativeElement.classList.remove('light-mode');
    } else {
      this.el.nativeElement.classList.add('light-mode');
      this.el.nativeElement.classList.remove('dark-mode');
    }
  }

  constructor(private el: ElementRef) {}
}
