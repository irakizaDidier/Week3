import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private newPost: any = null;

  setNewPost(post: any): void {
    this.newPost = post;
  }

  getNewPost(): any {
    return this.newPost;
  }

  clearNewPost(): void {
    this.newPost = null;
  }
}
