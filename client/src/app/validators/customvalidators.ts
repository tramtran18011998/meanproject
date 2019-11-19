import { AbstractControl } from '@angular/forms';

export class Customvalidators {
    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('matkhau').value; // get password from our password form control
        const confirmPassword: string = control.get('matkhau2').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('matkhau2').setErrors({ NoPassswordMatch: true });
        }
      }
}
