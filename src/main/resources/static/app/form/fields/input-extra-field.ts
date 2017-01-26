import {Component,Input} from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'input-extra-field',
    template:`
        <div [formGroup]="formGroup" class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.minlength]="field.minLength" [attr.min]="field.min" [attr.max]="field.max"
            [attr.maxlength]="field.maxLength" [attr.placeholder]="field.placeholder"
            [attr.type]="field.type" [formControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity.extraFields[field.name]" [attr.disabled]="disabled" class="form-control">
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class InputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    @Input() formGroup:FormGroup;
    constructor(formDir: NgForm) {
        super(formDir);
    }
    get disabled():string {
        if(this.field && !this.field.writable) {
            return 'disabled';
        }
        return null;
    }
}
