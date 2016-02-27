var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var input_extra_field_1 = require('./fields/input-extra-field');
var form_1 = require('./model/form');
var textarea_extra_field_1 = require('./fields/textarea-extra-field');
var file_input_extra_field_1 = require('./fields/file-input-extra-field');
var DynamicForm = (function () {
    function DynamicForm(http, dcl, elementRef) {
        this.http = http;
        this.dcl = dcl;
        this.elementRef = elementRef;
        this.onlyExtraFields = true;
        this.form = new form_1.ExtraForm();
    }
    DynamicForm.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/customers/form?onlyExtraFields=' + this.onlyExtraFields).map(function (res) { return res.json(); })
            .subscribe(function (form) {
            _this.form = new form_1.ExtraForm(form);
            if (!_this.entity.extraFields) {
                _this.entity.extraFields = {};
            }
            _this.form.fields.forEach(function (field) {
                var type;
                if (field.isInput()) {
                    type = input_extra_field_1.InputExtraField;
                }
                if (field.isTypeTextArea()) {
                    type = textarea_extra_field_1.TextAreaExtraField;
                }
                if (field.isTypeFile()) {
                    type = file_input_extra_field_1.FileInputExtraField;
                }
                _this.dcl.loadIntoLocation(type, _this.elementRef, 'extraField').then(function (componentRef) {
                    var instance = componentRef.instance;
                    instance.entity = _this.entity;
                    instance.field = field;
                });
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DynamicForm.prototype, "entity", void 0);
    DynamicForm = __decorate([
        core_1.Component({
            selector: 'extra-form',
            template: '<div #extraField></div>'
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.DynamicComponentLoader, core_1.ElementRef])
    ], DynamicForm);
    return DynamicForm;
})();
exports.DynamicForm = DynamicForm;
