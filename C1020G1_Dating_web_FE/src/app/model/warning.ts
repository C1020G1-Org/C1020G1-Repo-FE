import { GroupUser } from 'src/app/model/group-user';
export interface GroupWarning {
    groupWarningId: number;
    warningContent: string;
    groupUser: GroupUser;
    warningDate: string;
}