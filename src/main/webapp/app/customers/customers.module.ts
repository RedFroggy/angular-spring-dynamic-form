/**
 * Customers module
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormModule } from '../form/form.module';

import {Customers} from './customers';

@NgModule({
    imports:        [ FormModule ],
    declarations: [ Customers ],
    bootstrap:    [ Customers ]
})
export class CustomersModule { }
