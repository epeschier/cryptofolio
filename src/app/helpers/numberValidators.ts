import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static isNumber(): ValidatorFn {
    return  (control: AbstractControl): {[key: string]: boolean} | null => {
      const num = /^[.\d]+$/.test(control.value) ? +control.value : NaN;
      if (num !== +control.value) {
        return { 'value': true };
      }

      return null;
    };
  }
}
