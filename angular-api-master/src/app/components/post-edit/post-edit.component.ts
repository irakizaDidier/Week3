import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
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
export class PostEditComponent implements OnChanges {
  @Input() post: any = {};
  @Output() postUpdated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  editedPost: any = {};
  successMessage: string = '';

  constructor(private apiClient: ApiClientService) {}

  ngOnChanges(): void {
    this.editedPost = { ...this.post };
  }

  save(): void {
    this.apiClient.updatePost(this.editedPost.id, this.editedPost).subscribe({
      next: () => {
        Object.assign(this.post, this.editedPost);
        this.successMessage = 'Post updated successfully!';
        this.postUpdated.emit();
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => console.error('Error updating post', err),
    });
  }

  close(): void {
    this.modalClosed.emit();
  }
}
