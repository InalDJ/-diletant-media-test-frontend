import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { MessageComponent } from './components/message/message.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'edit-post/:id', component: EditPostComponent},
  {path: 'manage-posts', component: ManagePostsComponent},
  {path: 'post-details/:id', component: PostDetailsComponent},
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'searchByAuthor/:author', component: SearchComponent},
  {path: 'searchByTag/:tag', component: SearchComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'message', component: MessageComponent},
  { path: 'logout', redirectTo: 'login'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
