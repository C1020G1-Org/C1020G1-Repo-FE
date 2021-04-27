import {ChildComment} from "./ChildComment";
import {User} from "./User";

export interface ParentComment {
  parentCommentId: number;
  content: string;
  commentImage: string;
  childComments: ChildComment[];
  user: User;
}
