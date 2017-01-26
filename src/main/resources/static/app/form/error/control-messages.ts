
import {Input,Component,Inject} from '@angular/core';
import {NgForm,AbstractControl} from '@angular/forms';
import {ValidatorService} from '../validators/validator.service';

@Component({
    selector:'error-messages',
    template: `<div [hidden]="!errors.length === 0"><span *ngFor="let error of errors"><span class="label label-danger">{{error}}</span>&nbsp;</span></div>`
})
export class ControlMessages {
    @Input('control') controlName: string;
    constructor(@Inject(NgForm) private formDir: NgForm) {}
    get errors() {
        let c:AbstractControl = this.formDir.form.get(this.controlName);
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
