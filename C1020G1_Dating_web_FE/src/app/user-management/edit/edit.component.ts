import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EditService} from "../edit.service";
import {Ward} from "../Ward";
import {District} from "../District";
import {Province} from "../Province";
import {User} from "../User";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editUserForm: FormGroup;

  userId: number;
  wards: any;
  districts: any;
  provinces: any;
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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      userId: new FormControl('',),
      userName: new FormControl('', [Validators.required]),
      gender: new FormControl('',[Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      marriaged: new FormControl('',[Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
    });


    this.activatedRoute.params.subscribe(data => {
      this.userId = data.userId;
      this.editService.findUserById(null).subscribe(data => {
        this.user = data;
        data.birthday = data.birthday.slice(0,10);
        // @ts-ignore
        this.user.district = data.ward.district;
        // @ts-ignore
        this.user.province = data.ward.district.province;
        this.editUserForm.patchValue(data);
      })
    });

    this.getData()


  }


  submit() {
    this.editService.updateUser(this.editUserForm.value.userId, this.editUserForm.value).subscribe(data => {
      console.log(this.editUserForm.value);
    })
  }

  getData() {
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

  cancel() {
    console.log(this.editUserForm);
  }

}
