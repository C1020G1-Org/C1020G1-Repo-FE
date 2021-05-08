

import {FormGroup} from "@angular/forms";

export function atLeastOneCheckboxValidator(formGroup: FormGroup) {
  if (formGroup.value.length < 1) {
    return {requireCheckboxToBeChecked: true}
  }
  return null
}
