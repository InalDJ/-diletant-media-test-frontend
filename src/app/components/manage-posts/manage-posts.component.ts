import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  posts: PostModel[] = [];
  
  constructor(private postService: PostService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
      if (this.authService.isLoggedIn() === false) {
         this.router.navigate(['/login']);
  } else{ this.getAllPosts();}
 
}

  getAllPosts(){
    this.postService.getAllPosts().subscribe(
      data=> {
          this.posts = data;
      }
    )
  }

  postDetails(id: number){
    this.router.navigate(['post-details', id]);
  }

  deletePost(id: number){
    this.postService.deletePost(id).subscribe((data) => {
      this.ngOnInit();
    }, error => {
      throwError(error);
    })
  }

  editPost(id: number){
    this.router.navigate(['edit-post', id]);
  }
}
