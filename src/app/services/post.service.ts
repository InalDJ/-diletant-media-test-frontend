import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../model/post-model';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
 
export class PostService {
 
  postUrl = 'http://185.244.27.156:8080/api/posts';
  searchpostUrl = 'http://185.244.27.156:8080/api/posts/search';
  searchpostsByAuthorUrl = 'http://185.244.27.156:8080/api/posts/searchByAuthor';
  searchpostsByTagUrl = 'http://185.244.27.156:8080/api/posts/searchByTag';
  tagsUrl = 'http://185.244.27.156:8080/api/posts/tags';
  recommendenPostsUrl = 'http://185.244.27.156:8080/api/posts/recommendedPosts';
  adminPostUrl =  'http://185.244.27.156:8080/api/admin';
  

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  getAllPosts() :Observable<any>{
    return this.http.get<any>(this.postUrl);
  }

  getRecommendedPosts(id: number) :Observable<any>{
    return this.http.get(`${this.recommendenPostsUrl}/${id}`);
  }

  searchPosts(keyword: string): Observable<any>{
    return this.http.get(`${this.searchpostUrl}/${keyword}`);
  }

  searchPostsByAuthor(author: string): Observable<any>{
    return this.http.get(`${this.searchpostsByAuthorUrl}/${author}`);
  }

  searchPostsByTag(tag: string): Observable<any>{
    return this.http.get(`${this.searchpostsByTagUrl}/${tag}`);
  }

  getPostById(id: number) :Observable<any>{
    return this.http.get(`${this.postUrl}/${id}`);
  }

  createPost(post: PostModel) : Observable<any>{
    return this.http.post(this.adminPostUrl, post);
  }

  updatePost(post: PostModel) : Observable<any>{
    return this.http.put(this.adminPostUrl, post);
  }

  getAllTags() :Observable<any>{
    return this.http.get<any>(this.tagsUrl);
  }

  deletePost(id: number) : Observable<any>{
    console.log(this.localStorage.retrieve('authenticationToken'))
    return this.http.delete(`${this.adminPostUrl}/${id}`);
  }
}