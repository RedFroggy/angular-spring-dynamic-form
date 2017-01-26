import {Component,Inject,Input} from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'select-extra-field',
    template:`
        <div [formGroup]="formGroup" class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <select [attr.title]="field.label" [attr.placeholder]="field.placeholder" [formControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity.extraFields[field.name]" class="form-control">
                <option *ngFor="let option of field.options" value="{{option.value}}">{{option.value}}</option>
            </select>
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class SelectExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    @Input() formGroup:FormGroup;
    constructor(@Inject(NgForm) formDir: NgForm) {
        super(formDir);
    }
}
