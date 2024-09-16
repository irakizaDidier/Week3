import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PostListComponent } from './post-list.component';
import { ApiClientService } from '../../services/api-client.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiClientService: ApiClientService;

  const mockPosts = [
    { userId: 1, id: 1, title: 'Test Post 1', body: 'Content 1' },
    { userId: 2, id: 2, title: 'Test Post 2', body: 'Content 2' },
  ];

  beforeEach(async () => {
    const apiClientServiceMock = {
      getPosts: jest.fn().mockReturnValue(of(mockPosts)),
    };

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPosts on initialization', () => {
    const getPostsSpy = jest.spyOn(component, 'getPosts');
    component.ngOnInit();
    expect(getPostsSpy).toHaveBeenCalledWith(1);
  });

  it('should set isLoading to true when fetching posts', () => {
    component.getPosts(1);
    expect(component.isLoading).toBe(true);
  });

  it('should populate posts and set isLoading to false on successful fetch', () => {
    component.getPosts(1);
    expect(component.posts.length).toBe(2);
    expect(component.posts).toEqual(mockPosts);
    expect(component.isLoading).toBe(false);
    expect(component.totalPages).toBe(10);
  });

  it('should handle errors and set isLoading to false on failed fetch', () => {
    jest.spyOn(apiClientService, 'getPosts').mockReturnValue(throwError(() => new Error('Error fetching posts')));

    component.getPosts(1);

    expect(component.error).toBe('Error fetching posts');
    expect(component.isLoading).toBe(false);
  });

  it('should add a new post to the beginning of the list', () => {
    const newPost = { userId: 3, id: 3, title: 'New Post', body: 'New content' };
    component.onPostCreated(newPost);
    expect(component.posts[0]).toEqual(newPost);
  });

  it('should update the current page and fetch posts on page change', () => {
    const getPostsSpy = jest.spyOn(component, 'getPosts');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(getPostsSpy).toHaveBeenCalledWith(2);
  });
});
