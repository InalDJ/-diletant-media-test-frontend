import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  post: PostModel;
  tag: string;
  id: number;

  isError:boolean;
 
  
  tagsFromDb: Array<string>;

  constructor(private router: Router, private postService: PostService, private authService: AuthService) { 
    this.post = {
    text: '',
    author: '',
    title: '',
    tags: []
    }
    this.tagsFromDb = [];

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() === false) {
      this.router.navigate(['/login']);
}
  
    this.createReactiveForm();
    this.listTags();
    
  }

  createReactiveForm(){
      this.createPostForm = new FormGroup({
      text: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      tag: new FormControl('',Validators.required),
    }) 
 
   
  }

  listTags(){
    this.postService.getAllTags().subscribe(
      data => {
        this.tagsFromDb = data
      }, error => {
        throwError(error);}
      
    )
  }

  addTagFromDb(tag: string){
    
    for (var i = this.tagsFromDb.length - 1; i >= 0; i--) {
      if(this.tagsFromDb[i] == tag){
        this.tagsFromDb.splice(i, 1)
      }
  }
    this.post.tags.push(tag);

  }

  addTag() {

    if(this.createPostForm.get('tag').value != null){ 
      this.tag = this.createPostForm.get('tag').value;
      this.post.tags.push(this.tag);
      this.createPostForm.setValue(null);
    } 

  }

  deleteTag(tag: string){
      this.post.tags = this.post.tags.filter(item => item !== tag);
      this.tagsFromDb.push(tag);
    }


  createPost(){
    this.post.title = this.createPostForm.get("title").value;
    this.post.text = this.createPostForm.get("text").value;
    this.post.author = this.createPostForm.get("author").value;
    
      this.postService.createPost(this.post).subscribe((data) => {
        this.router.navigateByUrl('/manage-posts');
      }, error => {
        this.isError = true;
        throwError(error);
      })
  }
 
  discardPost() {
    this.router.navigateByUrl('/');
  }

}
