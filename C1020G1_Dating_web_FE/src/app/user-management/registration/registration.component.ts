import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserCreateService} from "../service/user-create.service";
import {UserStorageService} from "../service/user-storage.service";
import {ConfirmPasswordValidator} from "../validator/password.validator";
import {ConfirmEmailValidator} from "../validator/email.validator";
import {District, Province, Ward} from "../../models/user-model";
import {Router} from "@angular/router";
import {BirthdayValidator} from "../validator/birthdayValidator";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public formRegistration: FormGroup;
  public showPassword: boolean = false;
  public showRePassword: boolean = false;
  public provinces: Array<Province>;
  public districts: Array<District>;
  public wards: Array<Ward>;

  constructor(public formBuilder: FormBuilder,
              public userCreate: UserCreateService,
              public userStorage: UserStorageService,
              public router: Router,
              public tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {

    this.userStorage.user.userName = this.tokenStorage.getUser().userName;
    this.userStorage.user.email = this.tokenStorage.getUser().email;

    this.formRegistration = this.formBuilder.group({
      accountName: [this.userStorage.account.accountName, [Validators.required, Validators.pattern("^[0-9A-Za-z_]*$"), Validators.minLength(6), Validators.maxLength(24)]],
      userName: [this.userStorage.user.userName, [Validators.required,Validators.minLength(6),Validators.maxLength(24)]],
      password: [this.userStorage.account.password, [Validators.required, Validators.minLength(6),Validators.maxLength(24)]],
      rePassword: [this.userStorage.rePassword, [Validators.required]],
      occupation: [this.userStorage.user.occupation, [Validators.required]],
      birthday: [this.userStorage.user.birthday, [Validators.required]],
      email: [this.userStorage.user.email, [Validators.required, Validators.email]],
      reEmail: [this.userStorage.reEmail, [Validators.required]],
      province: [this.userStorage.province, [Validators.required]],
      district: [this.userStorage.district, [Validators.required]],
      ward: [(this.userStorage.user.ward.wardId)? this.userStorage.user.ward.wardId: "", [Validators.required]],
      address: [this.userStorage.user.address, [Validators.required]],
      gender: [this.userStorage.user.gender, [Validators.required]],
      termOfService: [this.userStorage.termOfService, [Validators.required]],
    }, {validators: [ConfirmPasswordValidator, ConfirmEmailValidator, BirthdayValidator]});

    this.userCreate.getAllProvinces().subscribe(data => {
      this.provinces = data;
    });

    this.userCreate.getDistrictByProvince(this.userStorage.province).subscribe(data => {
      this.districts = data;
    });

    this.userCreate.getWardByDistrict(this.userStorage.district).subscribe(data => {
      this.wards = data;
    });
  }

  submit() {

    this.userStorage.account.accountName = this.formRegistration.value.accountName;
    this.userStorage.account.password = this.formRegistration.value.password;
    this.userStorage.user.userName = this.formRegistration.value.userName;
    this.userStorage.user.occupation = this.formRegistration.value.occupation;
    this.userStorage.user.birthday = this.formRegistration.value.birthday;
    this.userStorage.user.email = this.formRegistration.value.email;
    this.userStorage.user.ward.wardId = this.formRegistration.value.ward;
    this.userStorage.user.address = this.formRegistration.value.address;
    this.userStorage.user.gender = this.formRegistration.value.gender;
    this.userStorage.district = this.formRegistration.value.district;
    this.userStorage.province = this.formRegistration.value.province;
    this.userStorage.reEmail = this.formRegistration.value.reEmail;
    this.userStorage.rePassword = this.formRegistration.value.rePassword;
    this.userStorage.termOfService = this.formRegistration.value.termOfService;
    this.userStorage.registed()
    this.router.navigateByUrl("/initial-information");
    console.log(this.userStorage)
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleShowRePassword(): void {
    this.showRePassword = !this.showRePassword;
  }

  public changeDistrict(e) {
    let id = Number.parseInt(e.target.value);
    this.userCreate.getDistrictByProvince(id).subscribe(data => {
      this.districts = data;
    });
    this.wards = []
  }

  public changeWard(e) {
    let id = Number.parseInt(e.target.value);
    this.userCreate.getWardByDistrict(id).subscribe(data => {
      this.wards = data;
    });
  }

  goToLogin() {
    this.userStorage.clear()
    this.router.navigateByUrl("login");
  }
}

