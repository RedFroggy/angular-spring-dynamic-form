import {Component,Inject,Input} from '@angular/core';
import {NgFormModel} from '@angular/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';
import {ControlMessages} from '../error/control-messages';

@Component({
    selector: 'select-extra-field',
    directives:[ControlMessages],
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <select [attr.title]="field.label" [attr.placeholder]="field.placeholder" [ngFormControl]="fieldControl"
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
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
}
