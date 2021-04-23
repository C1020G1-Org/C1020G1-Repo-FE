import { Component, OnInit } from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keySearch: any;

  constructor(private searchingService: SearchingService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(keySearch: any) {
    // this.router.navigate(['/name-search'],{queryParams:{search: keySearch}})
    this.router.navigate(['/name-search/'], )
  }
}
