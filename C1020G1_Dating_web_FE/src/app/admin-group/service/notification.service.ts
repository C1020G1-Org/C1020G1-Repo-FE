import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Notification from 'src/app/model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  dbPath = '/notifications';
  notiRef: AngularFireList<Notification> = null;

  constructor(private db: AngularFireDatabase) {
  }

  getAll(id: number): AngularFireList<Notification> {
    return this.db.list(this.dbPath + '/' + id);
  }

  create(notification: Notification,id: number): any {
    return this.db.list(this.dbPath + '/' + id).push(notification);
  }

  delete(key: string,id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove(key);
  }

  deleteAll(id: number): Promise<void> {
    return this.db.list(this.dbPath + '/' + id).remove();
  }
}