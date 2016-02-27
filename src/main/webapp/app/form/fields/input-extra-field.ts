import {Component,Inject,Input} from 'angular2/core';
import {NgFormModel} from 'angular2/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';
import {ControlMessages} from '../error/control-messages';

@Component({
    selector: 'input-extra-field',
    directives:[ControlMessages],
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.minlength]="field.minLength" [attr.min]="field.min" [attr.max]="field.max"
            [attr.maxlength]="field.maxLength" [attr.placeholder]="field.label"
            [attr.type]="field.type" [ngFormControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity[field.name]" class="form-control">
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class InputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
}
