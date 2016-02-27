///<reference path="../../../../../../typings/lodash/lodash.d.ts" />
var EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.getValidatorErrorMessage = function (control) {
        var errors = [];
        if (control.hasError('required')) {
            errors.push('This field is required');
        }
        if (control.hasError('invalidEmailAddress')) {
            errors.push('Invalid email address');
        }
        if (control.hasError('invalidNumber')) {
            errors.push('Must be a number');
        }
        if (control.hasError('minlength')) {
            var error = control.getError('minlength');
            errors.push('At least ' + error.requiredLength + ' characters minimum, actual: ' + error.actualLength);
        }
        if (control.hasError('pattern')) {
            var error = control.getError('pattern');
            errors.push('Invalid pattern, must match: ' + error.regex);
        }
        return errors;
    };
    ValidatorService.emailValidator = function (control) {
        if (control.value && control.value.match(EMAIL_REGEX)) {
            return null;
        }
        return { 'invalidEmailAddress': true };
    };
    ValidatorService.numberValidator = function (control) {
        if (control.value && !isNaN(control.value)) {
            return null;
        }
        return { 'invalidNumber': true };
    };
    ValidatorService.regexValidator = function (pattern) {
        return function (control) {
            return control.value && new RegExp(pattern).test(control.value) ? null : { pattern: { regex: pattern } };
        };
    };
    return ValidatorService;
})();
exports.ValidatorService = ValidatorService;
