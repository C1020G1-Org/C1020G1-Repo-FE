import { GroupSocial } from "./GroupSocial";
import { ParentComment } from "./ParentComment";
import { User } from "./User";
import {PostImage2} from "./PostImage";

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
