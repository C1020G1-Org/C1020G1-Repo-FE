import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EditService} from "../edit.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  edtiUserForm = new FormGroup({
    userName: new FormControl,
    gender: new FormControl,
    dateOfBirth: new FormControl,
    married: new FormControl,
    occupation: new FormControl,
    email: new FormControl,
    address: new FormControl,
    province: new FormControl,
    district: new FormControl,
    ward: new FormControl,

  });
userId : number;

  constructor(
    private editService: EditService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
