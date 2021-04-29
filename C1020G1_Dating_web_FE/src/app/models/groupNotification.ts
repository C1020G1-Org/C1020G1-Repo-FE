import {User} from "./user-model";
import {GroupSocial} from "./group_social";

export default class NotificationGroup {
  key: string;
  groupSender: GroupSocial;
  user: User;
  content: string;
}
