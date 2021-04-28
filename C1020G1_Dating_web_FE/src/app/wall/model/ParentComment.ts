import {ChildComment} from "./ChildComment";
import {User} from "../../models/user-model";


export interface ParentComment {
  parentCommentId: number;
  content: string;
  commentImage: string;
  childComments: ChildComment[];
  user: User;
}
