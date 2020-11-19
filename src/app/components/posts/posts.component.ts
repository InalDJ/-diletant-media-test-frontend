import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/model/post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  posts: PostModel[] = [];
  


  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
   this.getAllPosts();
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

}
