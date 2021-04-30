import { ParentComment } from "./ParentComment";
import {PostImage2} from "./PostImage";
import {User} from "./user-model";
import {GroupSocial} from "./group_social";

export class Post {
    postId : number;
    postContent : string;
    postStatus : string;
    postPublished : string;
    user : User;
    groupSocial : GroupSocial;
    parentComments : ParentComment[];
    postImages : PostImage2[];
}
