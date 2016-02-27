import {Component,Inject,Input} from 'angular2/core';
import {NgFormModel} from 'angular2/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'textarea-extra-field',
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <textarea [attr.title]="field.label" [attr.minlength]="field.minLength"
            [attr.maxlength]="field.maxLength" [attr.placeholder]="field.label"
            [attr.type]="field.type" [ngFormControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity[field.name]" class="form-control"></textarea>
        </div>
    `
})
export class TextAreaExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:Object;
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
}
