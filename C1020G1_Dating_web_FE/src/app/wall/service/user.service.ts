import { Injectable } from '@angular/core';
import {Post} from "../../models/Post";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  postInfos: Post[];

  constructor() { }

  public savePostInfo(posts: Post[]){
    this.postInfos =posts;
  }

  public getPostInfo(){
    return this.postInfos;
  }

}
