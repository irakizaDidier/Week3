import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PostCreateComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PostCreateComponent,
  ],
})
export class PostCreateModule {}
