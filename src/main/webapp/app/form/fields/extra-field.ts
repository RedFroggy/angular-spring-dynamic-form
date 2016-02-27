import {NgFormModel,Control} from 'angular2/common';
import {ExtraFormField} from '../model/form';

export abstract class ExtraField {
    field:ExtraFormField;
    entity:{extraFields:Object};
    fieldControl:Control;
    constructor(private formDir: NgFormModel) {}
    ngOnInit():void {
        this.fieldControl = this.field.getControl();
        setTimeout(()=> {
            this.formDir.form.addControl(this.field.name,this.fieldControl);

            let value:any = '';
            if(this.entity && this.entity.extraFields && this.entity.extraFields[this.field.name]) {
                value = this.entity.extraFields[this.field.name];
            }  else if(this.field.hasValue()) {
                value = this.field.value;
                this.entity.extraFields[this.field.name] = value;
            }
            if(!this.field.isTypeFile()) {
                this.fieldControl.updateValue(value);
            }
        }, 0);
    }
}
