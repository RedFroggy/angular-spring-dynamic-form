var common_1 = require('angular2/common');
var validator_service_1 = require('../validators/validator.service');
///<reference path="../../../../../../typings/lodash/lodash.d.ts" />
var TYPE_EMAIL = 'email';
var TYPE_NUMBER = 'number';
var TYPE_TEXT = 'text';
var TYPE_TEXTAREA = 'textarea';
var ExtraFormField = (function () {
    function ExtraFormField(_field) {
        _.assignIn(this, _field);
        this.initValidators();
    }
    ExtraFormField.prototype.hasValue = function () {
        return !!this.value;
    };
    ExtraFormField.prototype.isType = function (type) {
        return type === this.type;
    };
    ExtraFormField.prototype.isTypeEmail = function () {
        return this.isType(TYPE_EMAIL);
    };
    ExtraFormField.prototype.isTypeNumber = function () {
        return this.isType(TYPE_NUMBER);
    };
    ExtraFormField.prototype.isTypeText = function () {
        return this.isType(TYPE_TEXT);
    };
    ExtraFormField.prototype.isInput = function () {
        return this.isTypeText()
            || this.isTypeEmail()
            || this.isTypeNumber();
    };
    ExtraFormField.prototype.isTypeTextArea = function () {
        return this.isType(TYPE_TEXTAREA);
    };
    ExtraFormField.prototype.getControl = function () {
        if (!this.control) {
            this.control = new common_1.Control(this.name, this.validators);
        }
        return this.control;
    };
    ExtraFormField.prototype.initValidators = function () {
        console.log('Adding validators to control ', this.name);
        var validators = [];
        if (this.required) {
            validators.push(common_1.Validators.required);
        }
        if (this.isTypeText() && this.minLength) {
            console.log('Adding minLength validator', this.minLength);
            validators.push(common_1.Validators.minLength(this.minLength));
        }
        if (this.isTypeText() && this.maxLength) {
            console.log('Adding maxLength validator', this.maxLength);
            validators.push(common_1.Validators.maxLength(this.maxLength));
        }
        if (this.isTypeEmail()) {
            validators.push(validator_service_1.ValidatorService.emailValidator);
        }
        if (this.isTypeNumber()) {
            validators.push(validator_service_1.ValidatorService.numberValidator);
        }
        console.log(validators.length + ' validators added to control', this.name);
        this.validators = common_1.Validators.compose(validators);
    };
    return ExtraFormField;
})();
exports.ExtraFormField = ExtraFormField;
var ExtraForm = (function () {
    function ExtraForm(_form) {
        if (_form && _form.fields) {
            this.entityName = _form.entityName;
            this.version = _form.version;
            var fields = [];
            _form.fields.forEach(function (field) {
                fields.push(new ExtraFormField((field)));
            });
            this.fields = fields;
        }
    }
    return ExtraForm;
})();
exports.ExtraForm = ExtraForm;
