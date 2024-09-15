import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  showErrorMessage(message: string) {
    window.alert(message);
  }
}
