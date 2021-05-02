import {User} from "./user-model";

export interface GroupSocial {
  groupId: number;
  groupName: string;
  groupPulished: string;
  imageBackground: string;
  imageAvatarUrl: string;
  admin: User;
  scope: string;
}

export interface GroupUser {
  groupUserId: number;
  groupSocial: GroupSocial;
  user: User;
}

export interface GroupRequest {
  groupRequestId: number;
  groupSocial: GroupSocial;
  user: User;
  sender: string;
}
