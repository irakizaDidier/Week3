import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<any> {
    const params = {
      _page: page.toString(),
      _limit: pageSize.toString(),
    };

    return this.http
      .get(`${this.apiUrl}/posts`, { params })
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostById(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPost(post: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/posts`, post)
      .pipe(catchError(this.handleError));
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/posts/${id}`, post)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts/${postId}/comments`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
