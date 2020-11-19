import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  posts: PostModel[] = [];
  keyword: string;
  author: string;
  tag: string;
 
  isEmpty: boolean;

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) {
   this.isEmpty = false;
   }

  ngOnInit(): void {
    if(this.route.snapshot.params['tag']){
      this.tag = this.route.snapshot.params['tag']
      this.searchPostsByTag(this.tag)
    }
    if(this.route.snapshot.params['author']){
      this.author = this.route.snapshot.params['author']
      this.searchPostsByAuthor(this.author);
    }
    if(this.route.snapshot.params['keyword']){
      this.keyword = this.route.snapshot.params['keyword']
      this.searchPosts(this.keyword);
    }
    
  }

  searchPostsByTag(tag: string){
    this.postService.searchPostsByTag(tag).subscribe(
      data => {
        this.posts = data;
      }, error => {
        this.isEmpty = true;
        throwError(error);
      }
      
    )
  }

  searchPosts(keyword: string){
    this.postService.searchPosts(keyword).subscribe(
      data => {
        this.posts = data;
      }, error => {
        this.isEmpty = true;
        throwError(error);
      }
       )
  }

  searchTagsFromThesamePage( tag: string){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['searchByTag', tag]);
  }

  searchPostsByAuthor(author: string){
    this.postService.searchPostsByAuthor(author).subscribe(
      data => {
        this.posts = data;
      }, error => {
        this.isEmpty = true;
        throwError(error);
      }
      
    )
  }

} 
