import {Component,Input,DynamicComponentLoader,ElementRef,ComponentRef,Type} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup,Form} from 'angular2/common';
import {Http} from 'angular2/http';
import {InputExtraField} from './fields/input-extra-field';
import {ExtraForm,ExtraFormField} from './model/form';
import {TextAreaExtraField} from './fields/textarea-extra-field';
import {FileInputExtraField} from './fields/file-input-extra-field';
import {ExtraField} from './fields/extra-field';
import {SelectExtraField} from './fields/select-extra-field';

@Component({
    selector: 'extra-form',
    template:'<div #extraField></div>'
})
export class DynamicForm {
    @Input('entity') entityPromise:Promise<{extraFields:any}>;
    form:ExtraForm;
    onlyExtraFields:boolean = true;
    constructor(private http:Http,private dcl: DynamicComponentLoader, private elementRef: ElementRef) {
        this.form = new ExtraForm();
    }
    ngOnInit():void {

        let formPromise:Promise<{entityName:string,version:number,fields:Array<any>}> = this.http.get('http://localhost:8080/api/customers/form?onlyExtraFields='+this.onlyExtraFields)
            .map(res => res.json())
            .toPromise();

        Promise.all([this.entityPromise,formPromise]).then((values) => {
            let entity:{extraFields:any} = values[0];

            this.form = new ExtraForm(values[1]);

            if(!entity.extraFields) {
                entity.extraFields = {};
            }
            this.form.fields.forEach((field:ExtraFormField) => {
                let type:Type;
                if(field.isInput()) {
                    type = InputExtraField;
                }
                if(field.isTypeTextArea()) {
                    type = TextAreaExtraField;
                }
                if(field.isTypeFile()) {
                    type = FileInputExtraField;
                }
                if(field.isTypeSelect()) {
                    type = SelectExtraField;
                }
                this.dcl.loadIntoLocation(type,this.elementRef,'extraField').then((componentRef:ComponentRef) => {
                    let instance:ExtraField = componentRef.instance;
                    instance.entity = entity;
                    instance.field = field;
                });
            });
        });
    }
}
