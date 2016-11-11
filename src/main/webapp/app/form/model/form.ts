import {Validators, FormControl, ValidatorFn} from '@angular/forms';
import {ValidatorService} from '../validators/validator.service';

///<reference path="../../../../../../typings/lodash/lodash.d.ts" />

const TYPE_EMAIL:string = 'email';
const TYPE_NUMBER:string = 'number';
const TYPE_TEXT:string = 'text';
const TYPE_TEXTAREA:string = 'textarea';
const TYPE_FILE:string = 'file';
const TYPE_PASSWORD:string = 'password';
const TYPE_SELECT:string = 'select';
const TYPE_DATE:string = 'date';

export class ExtraFormField {
    id:number;
    entityName:string;
    type:string;
    name:string;
    label:string;
    required:boolean;
    extrafield:boolean;
    readable:boolean;
    writable:boolean;
    pattern:string;
    enumValues:Array<string>;
    value:string;
    min:number;
    max:number;
    minLength:number;
    maxLength:number;
    showAsColumn:boolean;
    fileAccept:string;
    options:Array<{id:number,value:string}>;
    private validators:ValidatorFn;
    private control:FormControl;
    constructor(_field?:any) {
        _.assignIn(this,_field);
        this.initValidators();
    }
    hasValue():boolean {
        return !!this.value;
    }
    isType(type:string):boolean {
        return type === this.type;
    }
    isTypeEmail():boolean {
        return this.isType(TYPE_EMAIL);
    }
    isTypeNumber():boolean {
        return this.isType(TYPE_NUMBER);
    }
    isTypeText():boolean {
        return this.isType(TYPE_TEXT);
    }
    isTypeFile():boolean {
        return this.isType(TYPE_FILE);
    }
    isInput():boolean {
        return this.isTypeText()
            || this.isTypeEmail()
            || this.isTypeNumber()
            || this.isTypePassword();
    }
    isTypeTextArea():boolean {
        return this.isType(TYPE_TEXTAREA);
    }
    isTypePassword():boolean  {
        return this.isType(TYPE_PASSWORD);
    }
    isTypeSelect():boolean  {
        return this.isType(TYPE_SELECT);
    }
    isTypeDate():boolean {
        return this.isType(TYPE_DATE);
    }
    getControl():FormControl {
        if(!this.control) {
            this.control = new FormControl(this.name,this.validators);
        }
        return this.control;
    }
    private initValidators():void {
        console.log('Adding validators to control ',this.name);
        let validators:Array<any> = [];
        if(this.required) {
            validators.push(Validators.required);
        }
        if(this.isTypeText() && this.minLength) {
            console.log('Adding minLength validator',this.minLength);
            validators.push(Validators.minLength(this.minLength));
        }
        if(this.isTypeText() && this.maxLength) {
            console.log('Adding maxLength validator',this.maxLength);
            validators.push(Validators.maxLength(this.maxLength));
        }
        if(this.isTypeEmail()) {
            validators.push(ValidatorService.emailValidator);
        }
        if(this.isTypeNumber()) {
            validators.push(ValidatorService.numberValidator);
        }
        if(this.isInput() && this.pattern) {
            validators.push(ValidatorService.regexValidator(this.pattern));
        }
        console.log(validators.length+' validators added to control',this.name);
        if(validators.length > 0) {
            this.validators = Validators.compose(validators);
        }
    }
}


export class ExtraForm {
    entityName:string;
    version:number;
    fields:Array<ExtraFormField>;
    constructor(_form?:{entityName:string,version:number,fields:Array<any>}) {
        if(_form && _form.fields) {
            this.entityName = _form.entityName;
            this.version = _form.version;
            let fields:Array<ExtraFormField> = [];
            _form.fields.forEach((field)=> {
                fields.push(new ExtraFormField((field)));
            });
            this.fields = fields;
        }


    }
}
