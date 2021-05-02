import {Component, OnInit} from '@angular/core';
import {EditService} from "../service/edit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/auth/token-storage";



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(

  ) {
  }

}
