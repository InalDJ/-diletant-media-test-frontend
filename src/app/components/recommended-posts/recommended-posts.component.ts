
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-recommended-posts',
  templateUrl: './recommended-posts.component.html',
  styleUrls: ['./recommended-posts.component.css']
})
export class RecommendedPostsComponent implements OnInit {

 
  id: number;
  posts: PostModel[] = [];
  
  
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getRecommendedPosts();
  
   }

   

 
   getRecommendedPosts(){
     this.postService.getRecommendedPosts(this.id).subscribe(
       data=> {
           this.posts = data;
       }, error => {
          throwError(error);
         
       }
     )
   }
 
   postDetails(id: number){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
     this.router.navigate(['post-details', id]);
   }

}
