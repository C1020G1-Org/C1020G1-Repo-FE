import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import { SearchingService } from "../../service/searching/searching.service";
import { Router } from "@angular/router";
import { NotificationGroupService } from 'src/app/admin-group/service/group-notification.service';
import { map } from 'rxjs/operators';
import Notification from 'src/app/model/group-notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;
  notiList: Notification[] = [];

  constructor(private notificationGroupService: NotificationGroupService, private searchingService: SearchingService,
    private router: Router,private tokenStorageService:TokenStorageService) { }

  search(event: any) {
    this.searchingService.searchTerm.next(event.target.value);
    this.router.navigateByUrl('/name-search')
  }

  logout() {
    this.tokenStorageService.logOut();
    this.router.navigateByUrl("/login")
  }

  ngOnInit(): void {
    this.setNotiList();
  }

  setNotiList() {
    this.notificationGroupService.getAll(this.userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(data => ({ key: data.payload.key, ...data.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notiList = data;
    });
  }

  deleteAll() {
    this.notificationGroupService.deleteAll(this.userId).then(() => console.log('delete all success!'));
  }

  nav(noti: Notification) {
    this.router.navigateByUrl(noti.href);
  }

  clear(noti: Notification){
    this.notificationGroupService.delete(noti.key, 5).then(() => console.log('delete success!'));
  }

  get userId(): number {
    return this.tokenStorageService.getUser().userId;
  }
}
