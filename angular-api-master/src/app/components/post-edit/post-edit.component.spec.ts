import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostEditComponent } from './post-edit.component';
import { ApiClientService } from '../../services/api-client.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let apiClientService: ApiClientService;

  const mockPost = { id: 1, title: 'Test Post', body: 'Test Body' };
  const updatedPost = { id: 1, title: 'Updated Post', body: 'Updated Body' };

  beforeEach(async () => {
    const apiClientServiceMock = {
      updatePost: jest.fn().mockReturnValue(of(updatedPost)),
    };

    await TestBed.configureTestingModule({
      declarations: [PostEditComponent],
      imports: [FormsModule, CommonModule],
      providers: [
        { provide: ApiClientService, useValue: apiClientServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize editedPost when input post changes', () => {
    component.post = mockPost;
    component.ngOnChanges();
    expect(component.editedPost).toEqual(mockPost);
  });

  it('should call updatePost and emit postUpdated on successful save', () => {
    jest.spyOn(component.postUpdated, 'emit');
    component.post = mockPost;
    component.ngOnChanges();

    component.save();

    expect(apiClientService.updatePost).toHaveBeenCalledWith(
      mockPost.id,
      mockPost
    );
    expect(component.postUpdated.emit).toHaveBeenCalled();
    expect(component.successMessage).toBe('Post updated successfully!');
  });

  it('should show successMessage for 3 seconds after save', () => {
    jest.useFakeTimers(); // To control the timeout
    component.save();

    expect(component.successMessage).toBe('Post updated successfully!');
    jest.advanceTimersByTime(3000);
    expect(component.successMessage).toBe('');
  });

  it('should log an error when updatePost fails', () => {
    jest.spyOn(console, 'error');
    jest
      .spyOn(apiClientService, 'updatePost')
      .mockReturnValue(throwError(() => new Error('Error updating post')));

    component.save();

    expect(console.error).toHaveBeenCalledWith(
      'Error updating post',
      expect.any(Error)
    );
  });

  it('should emit modalClosed when close is called', () => {
    jest.spyOn(component.modalClosed, 'emit');
    component.close();
    expect(component.modalClosed.emit).toHaveBeenCalled();
  });
});
