/**
 * Created by Michael DESIGAUD on 11/11/2016.
 */
import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {DateInputExtraField} from './fields/date-input-extra-field';
import {FileInputExtraField} from './fields/file-input-extra-field';
import {InputExtraField} from './fields/input-extra-field';
import {SelectExtraField} from './fields/select-extra-field';
import {TextAreaExtraField} from './fields/textarea-extra-field';
import {DynamicForm} from './extra-form';
import {ControlMessages} from './error/control-messages';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
    imports: [ BrowserModule, FormsModule, ReactiveFormsModule, PipesModule ],
    declarations: [
        DateInputExtraField, FileInputExtraField,
        InputExtraField, SelectExtraField, TextAreaExtraField, DynamicForm, ControlMessages ],
    entryComponents: [ DateInputExtraField, FileInputExtraField,
        InputExtraField, SelectExtraField, TextAreaExtraField ],
    bootstrap:    [
        DynamicForm, ControlMessages ],
    exports: [ BrowserModule, FormsModule, ReactiveFormsModule, ControlMessages, DynamicForm, PipesModule ]
})
export class FormModule { }
