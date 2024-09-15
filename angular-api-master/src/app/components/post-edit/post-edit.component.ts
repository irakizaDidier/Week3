import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PostEditComponent {
  @Input() post: any = {};
  @Output() postUpdated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  constructor(private apiClient: ApiClientService) {}

  save(): void {
    this.apiClient.updatePost(this.post.id, this.post).subscribe({
      next: () => {
        this.postUpdated.emit(); 
        this.close();
      },
      error: (err) => console.error('Error updating post', err),
    });
  }

  close(): void {
    this.modalClosed.emit();
  }
}
