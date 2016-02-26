import {Component,Inject,Input} from 'angular2/core';
import {Validators,NgFormModel,Control,NgFormControl} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {ValidatorService} from '../validators/validator.service';

@Component({
    selector: 'extra-field',
    template:`
        <label [attr.for]="field.name">{{field.label}}</label>
        <input [attr.title]="field.label" [attr.placeholder]="field.label" [attr.type]="field.type" [ngFormControl]="fieldControl"
        [attr.id]="field.name" [(ngModel)]="entity[field.name]" class="form-control">
    `
})
export class ExtraField {
    @Input() field:{name:string,required:boolean,type:string,value:string};
    @Input() entity:Object;
    fieldControl:Control;
    constructor(@Inject(NgFormModel) private formDir: NgFormModel) {}
    ngOnInit():void {
        this.fieldControl = new Control(this.field.name,this.getValidators());
        setTimeout(()=> {
            this.formDir.form.addControl(this.field.name,this.fieldControl);
            if(this.field.value) {
                this.fieldControl.updateValue(this.field.value);
                this.entity[this.field.name] = this.field.value;
            }
        }, 0);

    }
    getValidators():Function {
        let validators:Array<Function> = [];
        if(this.field.required) {
            validators.push(Validators.required);
        }
        if(this.field.type === 'email') {
            validators.push(ValidatorService.emailValidator);
        }
        return Validators.compose(validators);
    }
}
