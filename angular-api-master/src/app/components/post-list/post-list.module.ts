import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

@NgModule({
  declarations: [PostListComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostListComponent }]),
  ],
})
export class PostListModule {}
