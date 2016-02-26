import {Component,Input} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup,Form} from 'angular2/common';
import {Http} from 'angular2/http';
import {ExtraField} from './fields/field-email';

@Component({
    selector: 'extra-form',
    directives:[ExtraField],
    template:'<div #field class="form-group"  *ngFor="#field of form.fields"><extra-field [field]="field" [(entity)]="entity"></extra-field></div>'
})
export class ExtraForm {
    @Input() entity:Object;
    form:Object;
    onlyExtraFields:boolean = true;
    constructor(private http:Http) {
        this.form = {};
    }
    ngOnInit():void {
        this.http.get('http://localhost:8080/api/customers/form?onlyExtraFields='+this.onlyExtraFields).map(res => res.json())
            .subscribe((form:any) => this.form = form);
    }
}