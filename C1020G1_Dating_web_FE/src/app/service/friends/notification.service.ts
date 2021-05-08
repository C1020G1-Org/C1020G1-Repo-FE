import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import Notification from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private dbPath = '/friendrequest';

  tutorialsRef: AngularFireList<Notification> = null;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(id: number): AngularFireList<Notification> {
    return this.db.list(this.dbPath + '/' + id);
  }

  create(notification: Notification,id:number): any {
    console.log(notification);
    return this.db.list(this.dbPath + '/' + id).push(notification);
  }


  delete(id: number,key: string): Promise<any> {
    return this.db.list(this.dbPath + '/' + id).remove(key);
  }
}
