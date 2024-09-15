import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PostCreateComponent {
  post = { title: '', body: '', userId: 1 };
  successMessage: string = '';
  isSubmitted: boolean = false;

  @Output() postCreated = new EventEmitter<any>();
  postService: any;

  constructor(private apiClient: ApiClientService, private router: Router) {}

  createPost(): void {
    this.apiClient.createPost(this.post).subscribe({
      next: (createdPost) => {
        this.postService.setNewPost(createdPost);
        this.successMessage = 'Post created successfully!';
        this.router.navigate(['/posts']); 
      },
      error: (err) => window.alert(err),
    });
  }
}
