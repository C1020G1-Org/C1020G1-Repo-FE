import {GroupUser} from "./group_social";
export interface GroupWarning {
  groupWarningId: number;
  warningContent: string;
  groupUser: GroupUser;
  warningDate: string;
}
