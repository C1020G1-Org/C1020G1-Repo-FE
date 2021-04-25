import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EditService} from "../edit.service";
import {Ward} from "../Ward";
import {District} from "../District";
import {Province} from "../Province";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  userId: number;
  wards: any;
  districts: any;
  provinces: any;
  user;

    editUserForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      marriaged: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
  });


  compareWard(c1: Ward, c2: Ward): boolean {
    return c1 && c2 ? c1.wardId === c2.wardId : false;
  }

  compareDistrict(c1: District, c2: District): boolean {
    return c1 && c2 ? c1.districtId === c2.districtId : false;
  }
  compareProvince(c1: Province, c2: Province): boolean {
    return c1 && c2 ? c1.provinceId === c2.provinceId : false;
  }
  constructor(
    private editService: EditService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.userId = data.userId;
      this.editService.findUserById(this.userId).subscribe(data => {
        this.user = data;
        console.log(data);
        this.editUserForm.patchValue(data);
        console.log(this.editUserForm.value)
      })
    });

    this.getData()
  }


  updateUser() {
    this.editService.updateUser(this.userId, this.editUserForm.value).subscribe(data => {
      this.router.navigateByUrl("/edit", this.user = data);
    })
  }

  getData(){
    this.editService.getWard().subscribe(ward => {
      this.wards = ward;
    });
    this.editService.getDistrict().subscribe(district => {
      this.districts = district;
    });
    this.editService.getProvince().subscribe(province => {
      this.provinces = province;
    })

  }

}
