var ExtraField = (function () {
    function ExtraField(formDir) {
        this.formDir = formDir;
    }
    ExtraField.prototype.ngOnInit = function () {
        var _this = this;
        this.fieldControl = this.field.getControl();
        setTimeout(function () {
            _this.formDir.form.addControl(_this.field.name, _this.fieldControl);
            var value = '';
            if (_this.entity && _this.entity[_this.field.name]) {
                value = _this.entity[_this.field.name];
            }
            else if (_this.field.hasValue()) {
                value = _this.field.value;
                _this.entity[_this.field.name] = value;
            }
            _this.fieldControl.updateValue(value);
        }, 0);
    };
    return ExtraField;
})();
exports.ExtraField = ExtraField;
