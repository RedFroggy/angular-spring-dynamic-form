import {Control} from 'angular2/common';

const EMAIL_REGEX:RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export class ValidatorService {

    static emailValidator(control:Control) {
        if (control.value && control.value.match(EMAIL_REGEX)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}