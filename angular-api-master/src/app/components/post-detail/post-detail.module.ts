import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostEditComponent } from '../post-edit/post-edit.component';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostDetailComponent}]),
    FormsModule,
    PostEditComponent,
  ],
})
export class PostDetailModule {}
