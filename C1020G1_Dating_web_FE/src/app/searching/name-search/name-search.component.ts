import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from "../../service/searching/searching.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit {
  search: string;
  listUser;
  constructor(private searchingService: SearchingService,
              private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
   this.search = this.activeRouter.snapshot.paramMap.get("search");
   console.log(this.search);
      this.searchingService.doNameSearch(this.search).subscribe((data)=>{
        console.log(this.search);
        this.listUser = data;
      })
    };
}
