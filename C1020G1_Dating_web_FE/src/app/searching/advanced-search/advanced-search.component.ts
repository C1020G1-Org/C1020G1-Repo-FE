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
  listFavourites: Array<string> = [
    "music",
    "book",
    "sport"
  ];
  province: string;
  selectedGender: any;
  gender: string;
  user;
  listRecommendation;

  constructor(private searchingService: SearchingService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.setYear();
    this.getProvince();
    this.searchingService.getAllRecommendation(this.user.userId).subscribe((data) => {
      this.listRecommendation = data;
    })
  }

  doSearchName() {
    this.searchingService.doAdvancedSearch(this.name, this.birthday, this.selectedFavourites, this.province, this.gender).subscribe((data) => {
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
