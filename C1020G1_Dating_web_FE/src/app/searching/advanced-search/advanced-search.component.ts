import {Component, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  listUser: any;
  name: any;
  birthday: string;
  selectedYear;
  listBirthYear: Array<Number> = [];
  selectedProvince;
  listProvince: Array<string> = [];

  selectedFavourites = [];
  listFavourites: Array<string> = [];
  province: string;
  selectedGender: any;
  gender: string;
  user;
  listRecommendation;
  first: boolean = true;
  occupation;

  constructor(private searchingService: SearchingService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.setYear();
    this.getProvince();
    this.getFavourites();
    this.searchingService.getAllRecommendation(this.user.userId).subscribe((data) => {
      this.listRecommendation = data;
    })
  }

  doSearchName() {
    this.first = false;
    this.searchingService.doAdvancedSearch(this.name, this.birthday, this.selectedFavourites,
      this.province, this.occupation, this.gender, this.user.userId).subscribe((data) => {
      this.listUser = data;
    })
  }

  setYear() {
    for (let i = 0; i < 21; i++) {
      this.listBirthYear.push(1990 + i);
    }
  }

  getProvince() {
    this.searchingService.getAllProvince().subscribe((data) => {
      this.listProvince = data
    })
  }

  getFavourites() {
    this.searchingService.getListFavourites().subscribe((data) => {
      this.listFavourites = data
    })
  }

  selectedBirthday() {
    this.birthday = this.selectedYear;
  }

  addFavourite(checked, favourite) {
    if (checked) {
      this.selectedFavourites.push(favourite);
    } else {
      for (let index = 0; index < this.selectedFavourites.length; index++) {
        if (this.selectedFavourites[index] === favourite) {
          this.selectedFavourites.splice(index, 1);
        }
      }
    }
  }

  selectProvince() {
    this.province = this.selectedProvince;
  }

  selectGender() {
    this.gender = this.selectedGender;
  }
}
