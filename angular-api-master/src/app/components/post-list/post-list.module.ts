import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { PostCreateComponent } from '../post-create/post-create.component'; 

@NgModule({
  declarations: [PostListComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostListComponent }]),
    PostCreateComponent,
  ],
})
export class PostListModule {}
