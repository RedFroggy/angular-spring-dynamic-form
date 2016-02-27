var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var form_1 = require('../model/form');
var extra_field_1 = require('./extra-field');
var TextAreaExtraField = (function (_super) {
    __extends(TextAreaExtraField, _super);
    function TextAreaExtraField(formDir) {
        _super.call(this, formDir);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', form_1.ExtraFormField)
    ], TextAreaExtraField.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextAreaExtraField.prototype, "entity", void 0);
    TextAreaExtraField = __decorate([
        core_1.Component({
            selector: 'textarea-extra-field',
            template: "\n        <div class=\"form-group\">\n            <label [attr.for]=\"field.name\">{{field.label}}</label>\n            <textarea [attr.title]=\"field.label\" [attr.minlength]=\"field.minLength\"\n            [attr.maxlength]=\"field.maxLength\" [attr.placeholder]=\"field.label\"\n            [attr.type]=\"field.type\" [ngFormControl]=\"fieldControl\"\n            [attr.id]=\"field.name\" [(ngModel)]=\"entity[field.name]\" class=\"form-control\"></textarea>\n        </div>\n    "
        }),
        __param(0, core_1.Inject(common_1.NgFormModel)), 
        __metadata('design:paramtypes', [common_1.NgFormModel])
    ], TextAreaExtraField);
    return TextAreaExtraField;
})(extra_field_1.ExtraField);
exports.TextAreaExtraField = TextAreaExtraField;
