import { User } from "../user-management/model/user-model";
import { Group } from "./group";

export interface GroupUser {
    groupUserId: number;
    group: Group;
    user: User;
}