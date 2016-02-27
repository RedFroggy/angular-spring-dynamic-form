var common_1 = require('angular2/common');
var validator_service_1 = require('../validators/validator.service');
///<reference path="../../../../../../typings/lodash/lodash.d.ts" />
const TYPE_EMAIL = 'email';
const TYPE_NUMBER = 'number';
const TYPE_TEXT = 'text';
const TYPE_TEXTAREA = 'textarea';
const TYPE_FILE = 'file';
const TYPE_PASSWORD = 'password';
const TYPE_SELECT = 'select';
class ExtraFormField {
    constructor(_field) {
        _.assignIn(this, _field);
        this.initValidators();
    }
    hasValue() {
        return !!this.value;
    }
    isType(type) {
        return type === this.type;
    }
    isTypeEmail() {
        return this.isType(TYPE_EMAIL);
    }
    isTypeNumber() {
        return this.isType(TYPE_NUMBER);
    }
    isTypeText() {
        return this.isType(TYPE_TEXT);
    }
    isTypeFile() {
        return this.isType(TYPE_FILE);
    }
    isInput() {
        return this.isTypeText()
            || this.isTypeEmail()
            || this.isTypeNumber()
            || this.isTypePassword();
    }
    isTypeTextArea() {
        return this.isType(TYPE_TEXTAREA);
    }
    isTypePassword() {
        return this.isType(TYPE_PASSWORD);
    }
    isTypeSelect() {
        return this.isType(TYPE_SELECT);
    }
    getControl() {
        if (!this.control) {
            this.control = new common_1.Control(this.name, this.validators);
        }
        return this.control;
    }
    initValidators() {
        console.log('Adding validators to control ', this.name);
        let validators = [];
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
        if (this.isInput() && this.pattern) {
            validators.push(validator_service_1.ValidatorService.regexValidator(this.pattern));
        }
        console.log(validators.length + ' validators added to control', this.name);
        this.validators = common_1.Validators.compose(validators);
    }
}
exports.ExtraFormField = ExtraFormField;
class ExtraForm {
    constructor(_form) {
        if (_form && _form.fields) {
            this.entityName = _form.entityName;
            this.version = _form.version;
            let fields = [];
            _form.fields.forEach((field) => {
                fields.push(new ExtraFormField((field)));
            });
            this.fields = fields;
        }
    }
}
exports.ExtraForm = ExtraForm;
