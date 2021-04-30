import { Post } from "./Post";

export interface PostImage{
    post: Post;
    postImages: Array<string>;
}

export interface PostImage2 {
    postImageId: number;
    postId: number;
    image: string;
}

export interface PostEditImage {
    post: Post;
    postImages: Array<PostImage2>;
    deleteImages: Array<PostImage2>;
    updateImages: Array<PostImage2>;
  }