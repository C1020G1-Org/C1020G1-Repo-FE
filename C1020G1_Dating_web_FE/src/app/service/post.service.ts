import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { TokenStorageService } from './auth/token-storage';
import { Post } from './../model/Post';
import { ParentComment } from '../model/ParentComment';
import { PostEditImage, PostImage } from '../model/PostImage';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsInService : Post[];
  parentCommentsInService : ParentComment[];
  httpOptions:any;
  baseUrl : string = 'http://localhost:8080/api/post';

  constructor(private http : HttpClient, private tokenStorage: TokenStorageService ) { 
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  /**
   * Author : CaoLPT
   * get all posts in newsfeed of logged user
   * @param userId 
   * @param pageNumber 
   */
  findAllPostInNewsFeed(userId : number,pageNumber : number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + `/newsfeed/`+ userId + `?page=` + pageNumber , this.httpOptions);
  }

  /**
   * Author : CaoLPT
   * get post by id
   * @param postId 
   */
  findPostById(postId : number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + `/`+ postId, this.httpOptions);
  }

  /**
   * Author : SonPH
   * create a new post
   * @param postImage 
   */
  createPost(postImage: PostImage): Observable<any> {
    return this.http.post<any>(this.baseUrl, postImage, this.httpOptions);
  }

  /**
   * Author : SonPH
   * update a post
   * @param postEditImage 
   */
  updatePost(postEditImage: PostEditImage): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + postEditImage.post.postId, postEditImage, this.httpOptions);
  }

}
