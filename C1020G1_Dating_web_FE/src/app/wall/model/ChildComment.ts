import {User} from "../../models/user-model";

export interface ChildComment {
  childCommentId: number;
  content: string;
  commentImage: string;
  commentTime: string;
  user: User;
}
