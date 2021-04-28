import {Component, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  listUser: any;
  name: any;
  birthday: number;
  selectedLevel;
  listBirthYear: Array<Object> = [
    {id: 0, year: 1999},
    {id: 1, year: 2000},
    {id: 2, year: 2001},
    {id: 3, year: 2002},
    {id: 4, year: 2003},
    {id: 5, year: 2004}
  ];

  listFavourites: Array<Object> = [
    {id: 0, favouriteName: "music"},
    {id: 1, favouriteName: "book"},
    {id: 2, favouriteName: "sport"}
  ];

  constructor(private searchingService: SearchingService) {
  }

  ngOnInit(): void {
  }

  doSearchName() {
    this.searchingService.doAdvancedSearch(this.name, this.birthday).subscribe((data) => {
      console.log(data);
      this.listUser = data;
    })
  }

  selected() {
    this.birthday = this.selectedLevel;
  }

  addFavourite() {

  }
}
