import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * This function is used to validate the matching of two fields.
 * @param source source field to match
 * @param target target field to match
 * @returns error object if the source and target fields do not match else null
 */
export function mismatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const sourceCtrl = control.get(source);
        const targetCtrl = control.get(target);

        return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { mismatch: true }
            : null;
    };
}