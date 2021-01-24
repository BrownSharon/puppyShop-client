import { AbstractControl } from "@angular/forms";
import isIsraeliIdValid from "israeli-id-validator";

export default function israeliIdValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length == 9 && !isIsraeliIdValid(control.value)) {
        return { 'israeliId': true };
    }
    return null;
}