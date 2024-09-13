import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiClient.getPostById(+id).subscribe({
        next: (data) => (this.post = data),
        error: (err) => (this.error = err),
      });
    }
  }
}
