import {Component, OnInit, Output} from '@angular/core';
import {WallService} from "../../wall/wall.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private wallService: WallService) {
  }

  ngOnInit(): void {
  }
}
