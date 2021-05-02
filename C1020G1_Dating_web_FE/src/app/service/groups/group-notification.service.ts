import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import NotificationGroup from "../../models/groupNotification";

@Injectable({
  providedIn: 'root'
})
/**
 * @author PhinNL
 * manage group notification
 */
export class NotificationGroupService {
  dbPath = '/group/notifications';
  notiRef: AngularFireList<Notification> = null;
  constructor(private db: AngularFireDatabase) {
  }
  getAll(id: number): AngularFireList<NotificationGroup> {
    return this.db.list(this.dbPath + '/' + id);
  }
  create(notification: NotificationGroup,id: number): any {
    return this.db.list(this.dbPath + '/' + id).push(notification);
  }
  delete(key: string,id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove(key);
  }
  deleteAll(id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove();
  }
}
