import { Component, OnInit } from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: any;

  constructor(private searchingService: SearchingService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.searchingService.searchTerm.next(event.target.value);
    // this.searchingService.getKeySearch(event.target.value);
    this.router.navigateByUrl('/name-search')
  }
}
