import { AbstractControl } from "@angular/forms";



export default function creditCardValidator(control:AbstractControl): { [key: string]: any } | null {
    
    
    let ccnNumber = control.value
    // Strip spaces and dashes
    ccnNumber = ccnNumber.replace(/[ -]/g, '');
    
    // See if the card is valid
    // The regex will capture the number in one of the capturing groups
    const match = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14}))$/.exec(ccnNumber);
    if (match) {
      // List of card types, in the same order as the regex capturing groups
      const types = ['Visa', 'MasterCard'];
      // Find the capturing group that matched
      // Skip the zeroth element of the match array (the overall match)
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
  
          return null
        }
      }
    } else {
     
      return  {ccValidation: true}

    } 
}