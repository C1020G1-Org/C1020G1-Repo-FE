import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit {
  user;
  search: string;
  listUser;
  listRecommendation;
  public name = '';

  constructor(private searchingService: SearchingService,
              private activeRouter: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.search = this.searchingService.passKeySearch();
    this.searchingService.doNameSearch(this.search).subscribe((data) => {
      this.listUser = data;
    });
    this.searchingService.getAllRecommendation(this.user.userId).subscribe((data) => {
      this.listRecommendation = data;
    })
  };


  doSearchName() {
    this.searchingService.doNameSearch(this.name).subscribe((data) => {
      this.listUser = data;
    })
  }

  navigateToAdvancedSearch() {
    this.activeRouter.navigateByUrl('/advanced-search')
  }
}
