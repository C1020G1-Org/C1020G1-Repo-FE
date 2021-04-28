import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {District, Province, User, Ward} from "../../models/user-model";
import {EditService} from "../service/edit.service";
import {TokenStorageService} from "../../service/auth/token-storage";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
    console.log(this.user);
    this.editUserForm.patchValue(this.user);
    this.editUserForm.controls.province.setValue(this.user.ward.district.province);
    this.editUserForm.controls.district.setValue(this.user.ward.district);
    this.editUserForm.controls.birthday.setValue(this.user.birthday.toString().slice(0,10))
    console.log(this.editUserForm.value)
    this.getData()
  }


  submit() {
    this.editService.updateUser(this.editUserForm.value.userId, this.editUserForm.value).subscribe(data => {
      console.log(this.editUserForm.value);
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
