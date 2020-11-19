import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  id: number;
  post: PostModel;

  constructor(private route: ActivatedRoute, private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    this.post = new PostModel();

    this.id = this.route.snapshot.params['id'];

    this.getPostById(this.id);
    
  }


  getPostById(id){
    this.postService.getPostById(id).subscribe(
      data => {
        this.post = data;
      }, error => {
        throwError(error);
      }
    )
  }

}
