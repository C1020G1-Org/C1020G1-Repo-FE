import { User } from "../user-management/model/user-model";
import { Group } from "./group";

export interface GroupRequest {
    groupRequestId: number;
    group: Group;
    user: User;
    sender: string;
}