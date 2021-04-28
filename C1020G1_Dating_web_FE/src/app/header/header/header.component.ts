import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import { SearchingService } from "../../service/searching/searching.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import Notification from 'src/app/model/group-notification';
import { NotificationGroupService } from 'src/app/service/group-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;
  notiList: Notification[] = [];

  constructor(private notificationGroupService: NotificationGroupService, private searchingService: SearchingService,
    private router: Router, private tokenStorageService: TokenStorageService) { }

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
  /**
   * @author PhinNL
   * get all group notification by user logged
   */
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

  /**
   * @author PhinNL
   * clear all group notification by user logged
   */
  deleteAll() {
    this.notificationGroupService.deleteAll(this.userId).then(() => console.log('delete all success!'));
  }

  /**
   * @author PhinNL
   * navigate to sender page
   */
  nav(href: string) {
    this.router.navigateByUrl(href);
  }

  /**
   * @author PhinNL
   * clear one group notification by user logged
   */
  clear(key: string) {
    this.notificationGroupService.delete(key, this.userId).then(() => console.log('delete success!'));
  }

  get userId(): number {
    return this.tokenStorageService.getUser().userId;
  }
}
