import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {TokenStorageService} from './auth/token-storage';
import {Post} from "../models/Post";
import {ParentComment} from "../models/ParentComment";
import {PostEditImage, PostImage} from "../models/PostImage";
import {ChildComment} from "../models/ChildComment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsInService: Post[];
  parentCommentsInService: ParentComment[];
  httpOptions: any;
  baseUrl: string = 'http://localhost:8080/api/post';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  /**
   * Author : CaoLPT
   * get all posts in newsfeed of logged user
   * @param userId
   * @param pageNumber
   */
  findAllPostInNewsFeed(userId: number, pageNumber: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/newsfeed/` + userId + `?page=` + pageNumber, this.httpOptions);
  }

  /**
   * Author : CaoLPT
   * get post by id
   * @param postId
   */
  findPostById(postId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/` + postId, this.httpOptions);
  }

  findAllPostInWall(userId: number, pageNumber: number):Observable<any> {
    return this.http.get<any>(this.baseUrl + `/wall/` + userId + `?page=` + pageNumber, this.httpOptions);
  }

  pushNewPost(post: Post) {
    this.postsInService.push(post)
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

  /**
   * Author: SonPH
   * update delete
   */

  deletePost(postId: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + postId , this.httpOptions);
  }

  observeCreatingComment(observablePost: Post, observableParentComment: ParentComment, observableChildComment: ChildComment) {

      for (let parentComment of observablePost.parentComments) {
        parentComment.user.account = null;
        for (let childComment of parentComment.childComments){
          childComment.user.account = null;
        }
      }

    if (observableChildComment == null) {
      for (let post of this.postsInService) {
        if (post.postId == observablePost.postId) {
          if (observableParentComment != null) {
            post.parentComments.push(observableParentComment);
          }
        }
      }
    } else {
      for (let post of this.postsInService) {
        if (post.postId == observablePost.postId) {
          for (let parentComment of post.parentComments) {
            if (parentComment.parentCommentId == observableParentComment.parentCommentId) {
              parentComment.childComments.push(observableChildComment);
              return;
            }
          }
        }
      }
    }
  }

  observeDeletingComment(observableParentCommentId: number, observableChildCommentId: number) {
    for (let post of this.postsInService) {
      if (observableParentCommentId != null) {
        for (let i = 0; i < post.parentComments.length; i++) {
          if (post.parentComments[i].parentCommentId == observableParentCommentId) {
            post.parentComments.splice(i, 1);
            return;
          }
        }
      }

      if (observableChildCommentId != null) {
        for (let parentComment of post.parentComments) {
          for (let j = 0; j < parentComment.childComments.length; j++) {
            if (parentComment.childComments[j].childCommentId == observableChildCommentId) {
              parentComment.childComments.splice(j, 1);
              return;
            }
          }
        }
      }
    }
  }

  observeEditingComment(observableParentComment: ParentComment, followChildComments: ChildComment[], observableChildComment: ChildComment) {
    for (let post of this.postsInService) {
      if (observableParentComment != null) {
        for (let i = 0; i < post.parentComments.length; i++) {
          if (post.parentComments[i].parentCommentId == observableParentComment.parentCommentId) {
            console.log('nhan tu db');
            console.log(observableParentComment);

            console.log('truoc edit');
            console.log(post.parentComments[i]);

            post.parentComments[i] = observableParentComment;
            post.parentComments[i].childComments = followChildComments;


            console.log(post.parentComments[i].childComments);
            return;
          }
        }
      }

      if (observableChildComment != null) {
        for (let parentComment of post.parentComments) {
          for (let j = 0; j < parentComment.childComments.length; j++) {
            if (parentComment.childComments[j].childCommentId == observableChildComment.childCommentId) {
              parentComment.childComments[j] = observableChildComment;
              return;
            }
          }
        }
      }
    }
  }

  observeEditingPost(observablePost: any) {
    for (let i = 0; i < this.postsInService.length; i++) {

      if (this.postsInService[i].postId == observablePost.post.postId) {
        let tempParentComment = this.postsInService[i].parentComments;

        this.postsInService[i] = observablePost.post;

        this.postsInService[i].parentComments = tempParentComment;

        return;
      }
    }
  }

  deletePostFE(postId: any) {
    for (let i = 0; i < this.postsInService.length; i++) {

      if (this.postsInService[i].postId == postId) {

        this.postsInService.splice(i, 1);

        return;
      }
    }
  }
}
