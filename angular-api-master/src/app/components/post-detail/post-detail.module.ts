import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostDetailComponent }]),
  ],
})
export class PostDetailModule {}
