import { Account } from './account';
import { Status } from './status';
import { Ward } from './ward';
export interface User {
    userId: number;
    userName: string;
    birthday: string;
    gender: string;
    occupation: string;
    email: string;
    userAvatar: string;
    userBackground: string;
    marriaged: string;
    address: string;
    status: Status;
    account: Account;
    ward: Ward;
}