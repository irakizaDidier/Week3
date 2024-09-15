import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  error: string = '';
  isLoading = true;
  showUpdateModal = false;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiClient.getPostById(+id).subscribe({
        next: (data) => {
          this.post = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
        },
      });
    }
  }

  openUpdateModal(): void {
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }
  onPostUpdated(): void {
    this.showUpdateModal = false;
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiClient.deletePost(+id).subscribe({
        next: () => {
          this.closeDeleteModal();
          this.router.navigate(['/posts']);
        },
        error: (err) => (this.error = err),
      });
    }
  }
}
