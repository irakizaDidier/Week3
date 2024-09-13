import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
})
export class PostEditComponent implements OnInit {
  post = { title: '', body: '', userId: 1 };
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiClient.getPostById(+id).subscribe({
        next: (data) => (this.post = data),
        error: (err) => window.alert(err),
      });
    }
  }

  updatePost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiClient.updatePost(+id, this.post).subscribe({
        next: () => (this.successMessage = 'Post updated successfully!'),
        error: (err) => window.alert(err),
      });
    }
  }
}
