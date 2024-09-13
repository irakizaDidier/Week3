import { Component } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  post = { title: '', body: '', userId: 1 };
  successMessage: string = '';

  constructor(private apiClient: ApiClientService) {}

  createPost(): void {
    this.apiClient.createPost(this.post).subscribe({
      next: () => (this.successMessage = 'Post created successfully!'),
      error: (err) => window.alert(err),
    });
  }
}
