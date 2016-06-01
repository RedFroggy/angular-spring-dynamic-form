import {Component,Inject,Input} from '@angular/core';
import {NgFormModel} from '@angular/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';
import {ControlMessages} from '../error/control-messages';

@Component({
    selector: 'date-input-extra-field',
    directives:[ControlMessages],
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.placeholder]="field.placeholder" type="date" [ngFormControl]="fieldControl"
            [attr.id]="field.name" [(ngModel)]="entity.extraFields[field.name]" [attr.disabled]="disabled" class="form-control">
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class DateInputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
    get disabled():string {
        if(this.field && !this.field.writable) {
            return 'disabled';
        }
        return null;
    }
}