import { User } from './user';
export interface Group {
    groupId: number;
    groupName: string;
    groupPulished: string;
    imageBackground: string;
    imageAvatarUrl: string;
    admin: User;
    scope: string;
}