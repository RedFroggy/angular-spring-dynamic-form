import {Component,Input,ComponentFactoryResolver,ComponentRef,Type,ViewChild,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import {InputExtraField} from './fields/input-extra-field';
import {ExtraForm,ExtraFormField} from './model/form';
import {TextAreaExtraField} from './fields/textarea-extra-field';
import {FileInputExtraField} from './fields/file-input-extra-field';
import {SelectExtraField} from './fields/select-extra-field';
import {DateInputExtraField} from './fields/date-input-extra-field';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'extra-form',
    template:'<div #extraField></div>'
})
export class DynamicForm {
    @Input('entity') entityPromise:Promise<{extraFields:any}>;
    @Input('formGroup') formGroup:FormGroup;
    @ViewChild('extraField', {read: ViewContainerRef}) extraFieldRef:ViewContainerRef;
    form:ExtraForm;
    onlyExtraFields:boolean = true;
    constructor(private http:Http,private componentFactoryResolver: ComponentFactoryResolver) {
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
                let type:Type<any>;
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
                if(field.isTypeDate()) {
                    type = DateInputExtraField;
                }

                let factory = this.componentFactoryResolver.resolveComponentFactory(type);
                let componentRef:ComponentRef<any> = this.extraFieldRef.createComponent(factory);
                componentRef.instance.entity = entity;
                componentRef.instance.field = field;
                componentRef.instance.formGroup = this.formGroup;
            });
        });
    }
}
