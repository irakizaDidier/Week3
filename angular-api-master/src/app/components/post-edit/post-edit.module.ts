import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostEditComponent } from './post-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostEditComponent }]),
    FormsModule,
    PostEditComponent,
  ],
})
export class PostEditModule {}
