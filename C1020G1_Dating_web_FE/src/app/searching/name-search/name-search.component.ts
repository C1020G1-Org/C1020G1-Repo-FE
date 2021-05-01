import {Component, DoCheck, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit,DoCheck {
  user;
  search;
  listUser;
  listGroup;
  listRecommendation;
  name;
  first: boolean = true;
  second: boolean = true;

  constructor(private searchingService: SearchingService,
              private activeRouter: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.listUser = [];
    this.user = this.tokenStorageService.getUser();
    this.doSearchNameHeader();
    this.searchingService.getAllRecommendation(this.user.userId).subscribe((data) => {
      this.listRecommendation = data;
    });
  };

  doSearchNameHeader() {
    this.first = false;

    this.searchingService.doNameSearch(this.searchingService.getKeySearch(), this.user.userId).subscribe((data) => {
      this.listUser = data;
    });
    this.searchingService.getListGroup(this.name, this.user.userId).subscribe((data) => {
      this.listGroup = data;
    })
  }

  doSearchName() {
    this.first = false;
    this.searchingService.doNameSearch(this.name, this.user.userId).subscribe((data) => {
      this.listUser = data;
    });
    this.searchingService.getListGroup(this.name, this.user.userId).subscribe((data) => {
      this.listGroup = data;
    })
  }

  navigateToAdvancedSearch() {
    this.activeRouter.navigateByUrl('/advanced-search')
  }

  ngDoCheck(): void {
    if (this.search != this.searchingService.getKeySearch() && this.second == true) {
      this.search = this.searchingService.getKeySearch();
      this.doSearchNameHeader();
      this.second = false;
    } else if (this.search != this.searchingService.getKeySearch() && this.second == false) {
      this.second = true;
    }
  }
}
