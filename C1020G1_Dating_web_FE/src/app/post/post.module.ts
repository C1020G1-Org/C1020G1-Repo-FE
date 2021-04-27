import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post/create-post.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export interface Data {
  id: string;
  url: string;
}

export interface User {
  userId: number;
  userName: string;
  birthday: any;
  gender: string;
  occupation: string;
  email: string;
  userAvatar: string;
  userBackground: string;
  marriaged: string;
  ward: {
    wardId: number;
    district: {
      districtId: number;
      province: {
        provinceId: number;
        provinceName: string
      };
      districtName: string;
    };
    wardName: string;
  };
  address: string;
  status: {
    statusId: number;
    statusName: string;
  };
  account: {
    accountId: number;
    accountName: string;
    password: string;
  };
}

export interface Post {
  postId: number;
  postContent: string;
  postStatus: string;
  user: User;
  groupSocial: {
    groupId: number;
    groupName: string;
    groupPublished: any;
    imageBackground: string;
    imageAvatarUrl: string;
    scope: string;
    admin: User;
  };
}

export interface PostImage {
  post: Post;
  postImages: Array<string>;
}

export interface PostImage2 {
  postImageId: number;
  post: number;
  image: string;
}

export interface PostEditImage {
  post: Post;
  postImages: Array<PostImage2>;
  deleteImages: Array<PostImage2>;
  updateImages: Array<PostImage2>;
}

@NgModule({
  declarations: [CreatePostComponent, EditPostComponent],
  exports: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PostModule {
}

