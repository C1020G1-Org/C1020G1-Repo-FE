import { Account } from "./account";
import { Status } from "./status";
import { Ward } from "./Ward";

export class User {
    userId : number;
    userName : string;
    birthday : string;
    gender : string;
    occupation : string;
    email : string;
    userAvatar : string;
    marriaged : string;
    userBackground : string;
    ward : Ward;
    address : string;
    status : Status;
    account : Account
}