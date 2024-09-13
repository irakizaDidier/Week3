import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadChildren: () =>
      import('../app/components/post-list/post-list.module').then(
        (m) => m.PostListModule
      ),
  },
  {
    path: 'post/:id',
    loadChildren: () =>
      import('../app/components/post-detail/post-detail.module').then(
        (m) => m.PostDetailModule
      ),
  },
  {
    path: 'posts/create',
    loadChildren: () =>
      import('../app/components/post-create/post-create.module').then(
        (m) => m.PostCreateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
