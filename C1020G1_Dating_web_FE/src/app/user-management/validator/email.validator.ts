import {FormGroup} from "@angular/forms";

export function ConfirmEmailValidator(group: FormGroup){
  const password = group.get('email').value;
  const rePassword = group.get('reEmail').value;

  return password === rePassword ? null : {notMatchEmail: true}
}
