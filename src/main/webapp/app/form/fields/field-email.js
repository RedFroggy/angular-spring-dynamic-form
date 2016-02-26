var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var validator_service_1 = require('../validators/validator.service');
var ExtraField = (function () {
    function ExtraField(formDir) {
        this.formDir = formDir;
    }
    ExtraField.prototype.ngOnInit = function () {
        var _this = this;
        this.fieldControl = new common_1.Control(this.field.name, this.getValidators());
        setTimeout(function () {
            _this.formDir.form.addControl(_this.field.name, _this.fieldControl);
            if (_this.field.value) {
                _this.fieldControl.updateValue(_this.field.value);
                _this.entity[_this.field.name] = _this.field.value;
            }
        }, 0);
    };
    ExtraField.prototype.getValidators = function () {
        var validators = [];
        if (this.field.required) {
            validators.push(common_1.Validators.required);
        }
        if (this.field.type === 'email') {
            validators.push(validator_service_1.ValidatorService.emailValidator);
        }
        return common_1.Validators.compose(validators);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ExtraField.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ExtraField.prototype, "entity", void 0);
    ExtraField = __decorate([
        core_1.Component({
            selector: 'extra-field',
            template: "\n        <label [attr.for]=\"field.name\">{{field.label}}</label>\n        <input [attr.title]=\"field.label\" [attr.placeholder]=\"field.label\" [attr.type]=\"field.type\" [ngFormControl]=\"fieldControl\"\n        [attr.id]=\"field.name\" [(ngModel)]=\"entity[field.name]\" class=\"form-control\">\n    "
        }),
        __param(0, core_1.Inject(common_1.NgFormModel)), 
        __metadata('design:paramtypes', [common_1.NgFormModel])
    ], ExtraField);
    return ExtraField;
})();
exports.ExtraField = ExtraField;
