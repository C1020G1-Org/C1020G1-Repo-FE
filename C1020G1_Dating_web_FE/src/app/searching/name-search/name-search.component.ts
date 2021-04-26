import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit {
  search: string;
  listUser;
  public name = '';
  searchTerm = new FormControl();
  private router: any;

  constructor(private searchingService: SearchingService,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.search = this.searchingService.passKeySearch();
    // this.searchingService.searchTerm.subscribe((newValue: string) => {
    //   this.searchTerm = newValue;
    // });
    this.searchingService.doNameSearch(this.search).subscribe((data) => {
      this.listUser = data;
    });
  };


  doSearchName() {
    this.searchingService.doNameSearch(this.name).subscribe((data) => {
      this.listUser = data;
      // console.log(this.listUser);
      // this.router.navigateByUrl('/name-search')
    })
  }
}
