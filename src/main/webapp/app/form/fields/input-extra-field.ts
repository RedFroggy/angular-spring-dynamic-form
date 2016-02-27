import {Component,Inject,Input} from 'angular2/core';
import {NgFormModel} from 'angular2/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'input-extra-field',
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.minlength]="field.minLength" [attr.min]="field.min" [attr.max]="field.max"
            [attr.maxlength]="field.maxLength" [attr.placeholder]="field.label"
            [attr.type]="field.type" [ngFormControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity[field.name]" class="form-control">
        </div>
    `
})
export class InputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:Object;
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
}
