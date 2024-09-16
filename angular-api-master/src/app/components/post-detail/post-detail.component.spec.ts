import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ApiClientService } from '../../services/api-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let apiClientService: ApiClientService;
  let mockActivatedRoute;
  let mockRouter: { navigate: any };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    const apiClientServiceMock = {
      getPostById: jest.fn(),
      deletePost: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService);
  });

  it('should fetch post details on init', () => {
    const postDetails = { id: 1, title: 'Test Post', body: 'Post content' };
    jest
      .spyOn(apiClientService, 'getPostById')
      .mockReturnValue(of(postDetails));

    fixture.detectChanges();

    expect(apiClientService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual(postDetails);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when fetching post fails', () => {
    const error = 'Error fetching post';
    jest
      .spyOn(apiClientService, 'getPostById')
      .mockReturnValue(throwError(() => error));

    fixture.detectChanges();

    expect(apiClientService.getPostById).toHaveBeenCalledWith(1);
    expect(component.error).toBe(error);
    expect(component.isLoading).toBe(false);
  });

  it('should open and close update modal', () => {
    component.openUpdateModal();
    expect(component.showUpdateModal).toBe(true);

    component.closeUpdateModal();
    expect(component.showUpdateModal).toBe(false);
  });

  it('should open and close delete modal', () => {
    component.openDeleteModal();
    expect(component.showDeleteModal).toBe(true);

    component.closeDeleteModal();
    expect(component.showDeleteModal).toBe(false);
  });

  it('should delete post and navigate to posts list', () => {
    jest.spyOn(apiClientService, 'deletePost').mockReturnValue(of({}));

    component.confirmDelete();
    expect(apiClientService.deletePost).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should handle error when deleting post fails', () => {
    const error = 'Error deleting post';
    jest
      .spyOn(apiClientService, 'deletePost')
      .mockReturnValue(throwError(() => error));

    component.confirmDelete();

    expect(apiClientService.deletePost).toHaveBeenCalledWith(1);
    expect(component.error).toBe(error);
  });
});
