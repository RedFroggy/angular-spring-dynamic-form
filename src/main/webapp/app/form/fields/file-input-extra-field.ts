import {Component,Inject,Input} from '@angular/core';
import {NgFormModel} from '@angular/common';
import {ExtraFormField} from '../model/form';
import {ExtraField} from './extra-field';
import {ControlMessages} from '../error/control-messages';

@Component({
    selector: 'file-input-extra-field',
    directives:[ControlMessages],
    template:`
        <div class="form-group">
            <label [attr.for]="field.name">{{field.label}}</label>
            <input [attr.title]="field.label" [attr.placeholder]="field.placeholder"
            type="file"
            [attr.accept]="field.fileAccept"
            [attr.id]="field.name" class="form-control" (change)="onChange($event)">
            <error-messages [control]="field.name"></error-messages>
        </div>
    `
})
export class FileInputExtraField extends ExtraField {
    @Input() field:ExtraFormField;
    @Input() entity:{extraFields:Object};
    constructor(@Inject(NgFormModel) formDir: NgFormModel) {
        super(formDir);
    }
    onChange(event:{preventDefault:Function,target:{files:Array<File>}}) {
        event.preventDefault();
        if(this.field.isTypeFile()) {
            let file:File = event.target.files[0];
            let fileReader:FileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onloadend = () => {
                this.entity.extraFields[this.field.name] = fileReader.result;
            };
        }
    }
}
