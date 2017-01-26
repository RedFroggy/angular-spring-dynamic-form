/**
 * Customer module
 * Created by Michael DESIGAUD on 11/11/2016.
 */
import { NgModule }      from '@angular/core';
import { FormModule } from '../form/form.module';

import {Customer} from './customer';

@NgModule({
    imports:        [ FormModule ],
    declarations:   [ Customer ],
    bootstrap:      [ Customer ]
})
export class CustomerModule { }
