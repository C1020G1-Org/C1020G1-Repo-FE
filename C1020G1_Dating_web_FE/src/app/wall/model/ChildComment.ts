import {User} from "./User";

export interface ChildComment {
  childCommentId: number;
  content: string;
  commentImage: string;
  commentTime: string;
  user: User;
}
