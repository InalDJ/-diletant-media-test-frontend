import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  post: PostModel;
  tag: string;
  id: number;
  isError:boolean;
  
  tagsFromDb: Array<string>;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private authService: AuthService) {

    this.tagsFromDb = [];
   }

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
  } 
   this.post = new PostModel();

    this.id = this.route.snapshot.params['id'];
    
    
    this.getPostById(this.id);
    console.log(this.post.text)
    this.editPostForm = new FormGroup({
      text: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      tag: new FormControl('',Validators.required),
    })

    this.listTags();    
  }

  listTags(){
    this.postService.getAllTags().subscribe(
      data => {
        this.tagsFromDb = data
      }, error => {throwError(error);}
      
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

    if(this.editPostForm.get('tag').value != null){ 
      this.tag = this.editPostForm.get('tag').value;
      this.post.tags.push(this.tag);
      this.editPostForm.setValue(null);
    } 

  }


  deleteTag(tag: string){
    this.post.tags = this.post.tags.filter(item => item !== tag);
    this.tagsFromDb.push(tag);
  }

  updatePost(){
    this.post.title = this.editPostForm.get("title").value;
    this.post.text = this.editPostForm.get("text").value;
    this.post.author = this.editPostForm.get("author").value;
    this.post.id = this.id;

    this.postService.updatePost(this.post).subscribe((data) => {
      this.router.navigateByUrl('/manage-posts');
    }, error => {
      this.isError = true;
      throwError(error);
    })
  }

  getPostById(id: number){
    this.postService.getPostById(id).subscribe(
      data => {
        this.post = data;
      }, error => {
        throwError(error);
      }
    )
  }

  discardPost() {
    this.router.navigateByUrl('/manage-posts');
  }

}
