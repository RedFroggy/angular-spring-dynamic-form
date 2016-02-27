import {Component,Input,DynamicComponentLoader,ElementRef,ComponentRef,Type} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup,Form} from 'angular2/common';
import {Http} from 'angular2/http';
import {InputExtraField} from './fields/input-extra-field';
import {ExtraForm,ExtraFormField} from './model/form';
import {TextAreaExtraField} from './fields/textarea-extra-field';

@Component({
    selector: 'extra-form',
    template:'<div #extraField></div>'
})
export class DynamicForm {
    @Input() entity:{extraFields:Object};
    form:ExtraForm;
    onlyExtraFields:boolean = true;
    constructor(private http:Http,private dcl: DynamicComponentLoader, private elementRef: ElementRef) {
        this.form = new ExtraForm();
    }
    ngOnInit():void {
        this.http.get('http://localhost:8080/api/customers/form?onlyExtraFields='+this.onlyExtraFields).map(res => res.json())
            .subscribe((form:any) => {
                this.form = new ExtraForm(form);
                if(!this.entity.extraFields) {
                    this.entity.extraFields = {};
                }
                this.form.fields.forEach((field:ExtraFormField) => {
                    let type:Type;
                    if(field.isInput()) {
                        type = InputExtraField;
                    }
                    if(field.isTypeTextArea()) {
                        type = TextAreaExtraField;
                    }
                    this.dcl.loadIntoLocation(type,this.elementRef,'extraField').then((componentRef:ComponentRef) => {
                        let instance:InputExtraField = componentRef.instance;
                        instance.entity = this.entity.extraFields;
                        instance.field = field;
                    });
                });
            });
    }
}
