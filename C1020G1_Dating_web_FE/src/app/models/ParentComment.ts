import { ChildComment } from "./ChildComment";
import { Post } from "./Post";
import {User} from "./user-model";

export class ParentComment {
    parentCommentId : number;
    content : string;
    commentImage : string;
    commentTime : string;
    post : Post;
    user : User;
    childComments : ChildComment[];
}
