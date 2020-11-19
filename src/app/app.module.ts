import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RecommendedPostsComponent } from './components/recommended-posts/recommended-posts.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TokenInterceptor } from 'src/app/token-interceptor';
import { SearchComponent } from './components/search/search.component';
import { MessageComponent } from './components/message/message.component';





@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    CreatePostComponent,
    PostDetailsComponent,
    RecommendedPostsComponent,
    ManagePostsComponent,
    EditPostComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    MessageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EditorModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule,

     
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
     
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
