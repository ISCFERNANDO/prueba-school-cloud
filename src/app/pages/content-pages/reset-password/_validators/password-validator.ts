import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class PasswordValidator {
      static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('password_confirmation').value; // get password from our password_confirmation form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our password_confirmation form control
          control.get('password_confirmation').setErrors({ NoPassswordMatch: true });
        }
      }
}
