import { FormGroup, ValidationErrors } from "@angular/forms";

export default function passwordMatchValidator(formGroup: FormGroup) : ValidationErrors | null {
    if (formGroup.get('password').value === formGroup.get('passwordConfirm').value)
      return null;
    else
      return {passwordMismatch: true};
  };