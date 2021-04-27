import { GroupSocial } from "./GroupSocial";
import { ParentComment } from "./ParentComment";
import { User } from "./User";

export class Post {
    postId : number;
    postContent : string;
    postStatus : string;
    postPublished : string;
    user : User;
    groupSocial : GroupSocial;
    // parentComments : ParentComment[];
}