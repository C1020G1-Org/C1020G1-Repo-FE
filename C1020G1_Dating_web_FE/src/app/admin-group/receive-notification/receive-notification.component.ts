import { Router } from '@angular/router';
import { NotificationService } from './../service/notification.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Notification from 'src/app/model/notification';

@Component({
  selector: 'app-receive-notification',
  templateUrl: './receive-notification.component.html',
  styleUrls: ['./receive-notification.component.css']
})
export class ReceiveNotificationComponent implements OnInit {
  notiList: Notification[];

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.setNotiList();
  }

  setNotiList() {
    this.notificationService.getAll(5).snapshotChanges().pipe( // 5 is userId is logged
      map(changes =>
        changes.map(data => ({ key: data.payload.key, ...data.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notiList = data;
    });
  }

  deleteAll() {
    this.notificationService.deleteAll(5).then(() => console.log('delete all success!')); // 5 is userId is logged
  }

  nav(noti: Notification){
    this.notificationService.delete(noti.key,5).then(() => console.log('delete success!')); // 5 is userId is logged
    this.router.navigateByUrl(noti.href);
  }
}
