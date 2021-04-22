import { User } from './user';
import { Group } from "./group";

export interface GroupUser {
    groupUserId: number;
    group: Group;
    user: User;
}