import {FormGroup} from "@angular/forms";

export function ConfirmPasswordValidator(group: FormGroup){
  const password = group.get('password').value;
  const rePassword = group.get('rePassword').value;

  return password === rePassword ? null : {notMatchPassword: true}
}
