import {FormGroup} from "@angular/forms";

export function BirthdayValidator(formGroup: FormGroup) {

  let dateArray = formGroup.get("birthday").value?.split("-");
  if (dateArray?.length == 3) {
    let birthdayPlus18 = new Date(+dateArray[0] + 18, +dateArray[1] - 1, dateArray[2])
    if (birthdayPlus18 >= new Date()) {
      return {age: true}
    }
  }
  return null;
}
