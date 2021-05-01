import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {District, Province, User, Ward} from "../../../models/user-model";
import {EditService} from "../../service/edit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/auth/token-storage";

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  public editUserForm: FormGroup;

  userId: number;
  wards: Ward[];
  districts: District[];
  provinces: Province[];
  user: User;

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
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      userId: new FormControl('',),
      userName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      marriaged: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
    });
    this.user = this.tokenStorage.getUser();
    this.editUserForm.patchValue(this.user);
    this.editUserForm.controls.province.setValue(this.user.ward.district.province);
    this.editUserForm.controls.district.setValue(this.user.ward.district);
    this.editUserForm.controls.birthday.setValue(this.user.birthday.toString().slice(0,10))
    this.getData()
  }


  submit() {
    console.log(this.editUserForm.value);
    this.user.userName = this.editUserForm.value.userName;
    this.user.gender = this.editUserForm.value.gender;
    this.user.birthday = this.editUserForm.value.birthday;
    this.user.userName = this.editUserForm.value.userName;
    this.user.marriaged = this.editUserForm.value.marriaged;
    this.user.occupation = this.editUserForm.value.occupation;
    this.user.email = this.editUserForm.value.email;
    this.user.address = this.editUserForm.value.address;
    this.user.ward = this.editUserForm.value.ward;
    this.editService.updateUser( this.user).subscribe(data => {
      this.tokenStorage.saveUser(this.user);
      window.location.reload();
    })
  }

  getData() {
    this.editService.getWard().subscribe(wards => {
      this.wards = wards;
    });
    this.editService.getDistrict().subscribe(districts => {
      this.districts = districts;
    });
    this.editService.getProvince().subscribe(provinces => {
      this.provinces = provinces;
    })

  }

  cancel() {
    console.log(this.editUserForm);
  }

}
