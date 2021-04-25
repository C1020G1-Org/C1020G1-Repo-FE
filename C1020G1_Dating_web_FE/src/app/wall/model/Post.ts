import {PostImage} from "./PostImage";
import {ParentComment} from "./ParentComment";


export interface Post {
  postId: number,
  postContent: string,
  postStatus: string,
  postPublished: string,
  postImages: PostImage[],
  postComment: ParentComment[]
}
