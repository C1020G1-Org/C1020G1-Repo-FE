import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './auth/token-storage';
import {ParentComment} from "../models/ParentComment";
import {ChildComment} from "../models/ChildComment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions:any;
  baseUrl : string = 'http://localhost:8080/api/comment';

  constructor(private http : HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+this.tokenStorage.getToken()})
      ,'Access-Control-Allow-Origin': 'http://localhost:4200','Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
   }


  // methods for parent comment
  findAllParentCommentByPostId(postId : number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + `/parent/`+ postId, this.httpOptions);
  }

  findParentCommentById(parentCommentId : number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + `/parent/find/`+ parentCommentId, this.httpOptions);
  }

  createParentComment(parentComment : ParentComment) : Observable<any>{
    return this.http.post<any>(this.baseUrl + `/parent`, parentComment , this.httpOptions);
  }

  editParentComment(parentCommentId : number ,parentComment : ParentComment) : Observable<any>{
    return this.http.put<any>(this.baseUrl + `/parent/` + parentCommentId, parentComment, this.httpOptions);
  }

  deleteParentComment(parentCommentId : number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl + `/parent/` + parentCommentId, this.httpOptions);
  }

  // methods for child comment
  findAllChildCommentByParentCommentId(parentCommentId : number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + `/child/`+ parentCommentId, this.httpOptions);
  }

  createChildComment(childComment : ChildComment) : Observable<any>{
    return this.http.post<any>(this.baseUrl + `/child`, childComment, this.httpOptions);
  }

  editChildComment(childCommentId : number ,childComment : ChildComment) : Observable<any>{
    return this.http.put<any>(this.baseUrl + `/child/` + childCommentId, childComment,this.httpOptions);
  }

  deleteChildComment(childCommentId : number) : Observable<any>{
    return this.http.delete<any>(this.baseUrl + `/child/` + childCommentId, this.httpOptions);
  }


}
