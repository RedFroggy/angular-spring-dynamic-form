
import {Input,Component,Inject} from 'angular2/core';
import {NgFormModel,AbstractControl} from 'angular2/common';
import {ValidatorService} from '../validators/validator.service';

@Component({
    selector:'error-messages',
    template: `<div [hidden]="!errors.length === 0"><span *ngFor="#error of errors"><span class="label label-danger">{{error}}</span>&nbsp;</span></div>`
})
export class ControlMessages {
    @Input('control') controlName: string;
    constructor(@Inject(NgFormModel) private formDir: NgFormModel) {}
    get errors() {
        let c:AbstractControl = this.formDir.form.find(this.controlName);
        if(c) {
            for (let propertyName in c.errors) {
                if (c.errors.hasOwnProperty(propertyName)) {
                    return ValidatorService.getValidatorErrorMessage(c);
                }
            }
        }
        return [];
    }
}
