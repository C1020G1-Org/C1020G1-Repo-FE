import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../post.module";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  public API: string = 'http://localhost:8080/api/post';

  constructor(public httpClient: HttpClient) {
  }

  getPostById(postId: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + postId);
  }

  createPost(post: Post): Observable<any> {
    return this.httpClient.post(this.API, post);
  }

  updatePost(post: Post): Observable<any> {
    return this.httpClient.put(this.API + '/' + post.postId, post)
  }
}
