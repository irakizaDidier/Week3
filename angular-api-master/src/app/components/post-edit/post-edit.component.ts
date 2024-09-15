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
  @Input() post: any = {}; // Input post object
  @Output() postUpdated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  editedPost: any = {}; // Temporary object for form data
  successMessage: string = ''; // Message after successful save

  constructor(private apiClient: ApiClientService) {}

  ngOnChanges(): void {
    // Make a copy of the input post to avoid direct modification
    this.editedPost = { ...this.post };
  }

  save(): void {
    // Call API to update the post using the editedPost data
    this.apiClient.updatePost(this.editedPost.id, this.editedPost).subscribe({
      next: () => {
        // Update the original post with editedPost values
        Object.assign(this.post, this.editedPost);
        this.successMessage = 'Post updated successfully!';
        this.postUpdated.emit(); // Emit event to notify parent component
        setTimeout(() => (this.successMessage = ''), 3000); // Clear message after 3 seconds
      },
      error: (err) => console.error('Error updating post', err),
    });
  }

  close(): void {
    // Emit modalClosed event to close the modal without saving
    this.modalClosed.emit();
  }
}
