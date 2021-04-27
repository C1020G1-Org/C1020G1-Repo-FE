import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post, PostEditImage, PostImage} from "../post.module";

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

  createPost(postImage: PostImage): Observable<any> {
    return this.httpClient.post(this.API, postImage);
  }

  updatePost(postEditImage: PostEditImage): Observable<any> {
    return this.httpClient.put(this.API + '/' + postEditImage.post.postId, postEditImage)
  }
}
