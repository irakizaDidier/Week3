import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  error: string = '';
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.getPosts(this.currentPage);
  }

  getPosts(page: number): void {
    this.isLoading = true;
    this.apiClient.getPosts(page, this.pageSize).subscribe({
      next: (data) => {
        this.posts = data;
        this.totalPages = Math.ceil(100 / this.pageSize);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      },
    });
  }

  onPostCreated(newPost: any): void {
    this.posts.unshift(newPost);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getPosts(page);
  }
}
