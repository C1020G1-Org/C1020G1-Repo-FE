import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import GroupRequestNotification from "../../models/groupRequestNotification";
@Injectable({
  providedIn: 'root'
})
/**
 * @author PhinNL
 * manage group notification
 */
export class NotificationRequestGroupService {
  dbPath = '/group/admin/request';
  constructor(private db: AngularFireDatabase) {
  }
  getAll(id: number): AngularFireList<GroupRequestNotification> {
    return this.db.list(this.dbPath + '/' + id);
  }
  create(notification: GroupRequestNotification, id: number): any {
    return this.db.list(this.dbPath + '/' + id).push(notification);
  }
  delete(key: string, id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove(key);
  }
  deleteAll(id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove();
  }
}
