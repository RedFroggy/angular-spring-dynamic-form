import {Component,Inject,Input} from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'date-input-extra-field',
    template:`
        <div [formGroup]="formGroup" class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.placeholder]="field.placeholder" type="date" [formControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity.extraFields[field.name]" [attr.disabled]="disabled" class="form-control">
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class DateInputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    @Input() formGroup:FormGroup;
    constructor(@Inject(NgForm) formDir: NgForm) {
        super(formDir);
    }
    get disabled():string {
        if(this.field && !this.field.writable) {
            return 'disabled';
        }
        return null;
    }
}