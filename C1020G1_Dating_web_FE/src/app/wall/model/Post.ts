import {PostImage} from "./PostImage";
import {ParentComment} from "./ParentComment";
import {User} from "../../models/user-model";



export interface Post {
  postId: number;
  postContent: string;
  postStatus: string;
  postPublished: string;
  user: User;
  postImages: PostImage[];
  parentComments: ParentComment[];
}
