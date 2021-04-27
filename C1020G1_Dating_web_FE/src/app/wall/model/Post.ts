import {PostImage} from "./PostImage";
import {ParentComment} from "./ParentComment";
import {User} from "./User";


export interface Post {
  postId: number;
  postContent: string;
  postStatus: string;
  postPublished: string;
  user: User;
  postImages: PostImage[];
  parentComments: ParentComment[];
}
