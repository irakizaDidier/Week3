import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call window.alert with the correct message', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const errorMessage = 'This is a test error message';

    service.showErrorMessage(errorMessage);

    expect(alertSpy).toHaveBeenCalledWith(errorMessage);

    alertSpy.mockRestore();
  });
});
