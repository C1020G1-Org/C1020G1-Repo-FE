import { ParentComment } from "./ParentComment";
import { User } from "./User";

export class ChildComment {
    childCommentId : number;
    content : string;
    commentImage : string;
    commentTime : string;
    parentComment : ParentComment;
    user : User
}