import {Component,Inject,Input} from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';

@Component({
    selector: 'textarea-extra-field',
    template:`
        <div [formGroup]="formGroup" class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <textarea [attr.title]="field.label" [attr.minlength]="field.minLength"
            [attr.maxlength]="field.maxLength" [attr.placeholder]="field.placeholder"
            [attr.type]="field.type" [formControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity.extraFields[field.name]" class="form-control"></textarea>
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class TextAreaExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    @Input() formGroup:FormGroup;
    constructor(@Inject(NgForm) formDir: NgForm) {
        super(formDir);
    }
}
