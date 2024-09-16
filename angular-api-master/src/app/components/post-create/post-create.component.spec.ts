import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCreateComponent } from './post-create.component';
import { ApiClientService } from '../../services/api-client.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let apiClientService: ApiClientService;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    const apiClientServiceMock = {
      createPost: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostCreateComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService);
  });

  it('should initialize with default values', () => {
    expect(component.post).toEqual({ title: '', body: '', userId: 1 });
    expect(component.successMessage).toBe('');
    expect(component.isSubmitted).toBe(false);
  });

  it('should not call createPost if title or body is missing', () => {
    component.post = { title: '', body: '', userId: 1 };
    component.createPost();
    expect(apiClientService.createPost).not.toHaveBeenCalled();

    component.post = { title: 'Test Title', body: '', userId: 1 };
    component.createPost();
    expect(apiClientService.createPost).not.toHaveBeenCalled();
  });

  it('should call createPost and navigate on success', () => {
    const mockCreatedPost = {
      id: 1,
      title: 'Test Title',
      body: 'Test Body',
      userId: 1,
    };
    jest
      .spyOn(apiClientService, 'createPost')
      .mockReturnValue(of(mockCreatedPost));

    component.post = { title: 'Test Title', body: 'Test Body', userId: 1 };
    component.createPost();

    expect(apiClientService.createPost).toHaveBeenCalledWith(component.post);
    expect(component.successMessage).toBe('Post created successfully!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(component.postCreated.emit).toHaveBeenCalledWith(mockCreatedPost);
  });

  it('should handle error when createPost fails', () => {
    const error = 'Error creating post';
    jest
      .spyOn(apiClientService, 'createPost')
      .mockReturnValue(throwError(() => error));

    component.post = { title: 'Test Title', body: 'Test Body', userId: 1 };
    window.alert = jest.fn();

    component.createPost();

    expect(apiClientService.createPost).toHaveBeenCalledWith(component.post);
    expect(window.alert).toHaveBeenCalledWith(error);
  });
});
