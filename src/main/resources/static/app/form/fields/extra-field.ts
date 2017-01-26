import {NgForm,FormControl} from '@angular/forms';
import {ExtraFormField} from '../model/form';

export abstract class ExtraField {
    field:ExtraFormField;
    entity:{extraFields:Object};
    fieldControl:FormControl;
    constructor(private formDir: NgForm) {}
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
                this.fieldControl.patchValue(value);
            }
        }, 0);
    }
}
