class ExtraField {
    constructor(formDir) {
        this.formDir = formDir;
    }
    ngOnInit() {
        this.fieldControl = this.field.getControl();
        setTimeout(() => {
            this.formDir.form.addControl(this.field.name, this.fieldControl);
            let value = '';
            if (this.entity && this.entity.extraFields && this.entity.extraFields[this.field.name]) {
                value = this.entity.extraFields[this.field.name];
            }
            else if (this.field.hasValue()) {
                value = this.field.value;
                this.entity.extraFields[this.field.name] = value;
            }
            if (!this.field.isTypeFile()) {
                this.fieldControl.updateValue(value);
            }
        }, 0);
    }
}
exports.ExtraField = ExtraField;
