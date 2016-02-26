var EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.emailValidator = function (control) {
        if (control.value && control.value.match(EMAIL_REGEX)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    return ValidatorService;
})();
exports.ValidatorService = ValidatorService;
