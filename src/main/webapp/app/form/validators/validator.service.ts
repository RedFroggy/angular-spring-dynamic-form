import {AbstractControl,Control} from 'angular2/common';

///<reference path="../../../../../../typings/lodash/lodash.d.ts" />

const EMAIL_REGEX:RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export class ValidatorService {

    static getValidatorErrorMessage(control:AbstractControl):Array<string> {
        let errors:Array<string> = [];
        if(control.hasError('required')) {
            errors.push('This field is required');
        }
        if(control.hasError('invalidEmailAddress')) {
            errors.push('Invalid email address');
        }
        if(control.hasError('invalidNumber')) {
            errors.push('Must be a number');
        }
        if(control.hasError('minlength')) {
            let error:{requiredLength:number,actualLength:number} = control.getError('minlength');
            errors.push('At least '+error.requiredLength+' characters minimum, actual: '+error.actualLength);
        }
        if(control.hasError('pattern')) {
            let error:{regex:string} = control.getError('pattern');
            errors.push('Invalid pattern, must match: '+error.regex);
        }
        return errors;
    }

    static emailValidator(control:Control):Object {
        if (control.value && control.value.match(EMAIL_REGEX)) {
            return null;
        }
        return { 'invalidEmailAddress': true };
    }

    static numberValidator(control:Control):Object {
        if(control.value && !isNaN(control.value)) {
            return null;
        }
        return { 'invalidNumber': true };
    }

    static regexValidator(pattern: string): Function {
        return (control: Control): {[key: string]: any} => {
            return control.value && control.value.match(pattern) ? null : {pattern: {regex:pattern}};
        };
    }
}
