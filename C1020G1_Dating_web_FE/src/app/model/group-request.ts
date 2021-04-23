import { User } from './user';
import { Group } from "./group";

export interface GroupRequest {
    groupRequestId: number;
    group: Group;
    user: User;
    sender: string;
}