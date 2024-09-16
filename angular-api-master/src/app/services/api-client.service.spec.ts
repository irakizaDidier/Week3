import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiClientService],
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts (GET)', () => {
    const dummyPosts = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'Post content 1' },
      { userId: 2, id: 2, title: 'Test Post 2', body: 'Post content 2' },
    ];

    service.getPosts(1, 5).subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/posts?_page=1&_limit=5`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should retrieve a single post by ID (GET)', () => {
    const dummyPost = { userId: 1, id: 1, title: 'Test Post', body: 'Post content' };

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('should create a new post (POST)', () => {
    const newPost = { title: 'New Post', body: 'Post content' };

    service.createPost(newPost).subscribe((post) => {
      expect(post).toEqual(newPost);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should update a post (PUT)', () => {
    const updatedPost = { id: 1, title: 'Updated Post', body: 'Updated content' };

    service.updatePost(1, updatedPost).subscribe((post) => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/posts/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a post (DELETE)', () => {
    service.deletePost(1).subscribe((response) => {
      expect(response).toBe(null);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle error responses', () => {
    const errorMessage = 'Error Code: 404\nMessage: Not Found';
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    service.getPostById(999).subscribe(
      () => fail('expected an error'),
      (error) => {
        expect(error).toBe(errorMessage);
        expect(window.alert).toHaveBeenCalledWith(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${service['apiUrl']}/posts/999`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
