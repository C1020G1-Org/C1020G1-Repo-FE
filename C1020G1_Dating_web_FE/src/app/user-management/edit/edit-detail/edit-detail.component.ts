import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {District, Province, User, Ward} from "../../../models/user-model";
import {EditService} from "../../service/edit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/auth/token-storage";
import {UserCreateService} from "../../service/user-create.service";

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

  constructor(
    private editService: EditService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userCreate: UserCreateService
  ) {
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      userId: new FormControl('',),
      userName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      marriaged: new FormControl('single', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
    });
    this.user = this.tokenStorage.getUser();

    this.editUserForm.controls.userName.setValue(this.user.userName);
    this.editUserForm.controls.gender.setValue(this.user.gender);
    this.editUserForm.controls.marriaged.setValue(this.user.marriaged);
    this.editUserForm.controls.occupation.setValue(this.user.occupation);
    this.editUserForm.controls.email.setValue(this.user.email);
    this.editUserForm.controls.address.setValue(this.user.address);
    this.editUserForm.controls.province.setValue(this.user.ward.district.province.provinceId);
    this.editUserForm.controls.district.setValue(this.user.ward.district.districtId);
    this.editUserForm.controls.birthday.setValue(this.user.birthday.toString().slice(0, 10));
    this.editUserForm.controls.ward.setValue(this.user.ward.wardId);

    this.userCreate.getAllProvinces().subscribe(data => {
      this.provinces = data;
    });

    this.userCreate.getDistrictByProvince(this.user.ward.district.province.provinceId).subscribe(data => {
      this.districts = data;
    });

    this.userCreate.getWardByDistrict(this.user.ward.district.districtId).subscribe(data => {
      this.wards = data;
    });
  }


  submit() {
    this.user.userName = this.editUserForm.value.userName;
    this.user.gender = this.editUserForm.value.gender;
    this.user.birthday = this.editUserForm.value.birthday;
    this.user.userName = this.editUserForm.value.userName;
    this.user.marriaged = this.editUserForm.value.marriaged;
    this.user.occupation = this.editUserForm.value.occupation;
    this.user.email = this.editUserForm.value.email;
    this.user.address = this.editUserForm.value.address;
    this.user.ward.wardId = this.editUserForm.value.ward;
    this.editService.updateUser(this.user).subscribe(data => {
      this.tokenStorage.saveUser(data)
      window.location.reload();
    })
  }

  public changeDistrict(e) {
    let id = e.target.value.split(": ")[1];
    this.userCreate.getDistrictByProvince(id).subscribe(data => {
      this.districts = data;
    });
    this.editUserForm.controls.district.setValue("");
    this.wards = [];
    this.editUserForm.controls.ward.setValue("");
  }

  public changeWard(e) {
    let id = e.target.value.split(": ")[1]
    this.userCreate.getWardByDistrict(id).subscribe(data => {
      this.wards = data;
    });
    this.editUserForm.controls.ward.setValue("");
  }

  cancel() {
    this.editUserForm.reset()
  }

}
