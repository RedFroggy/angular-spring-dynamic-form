/**
 * Application module
 * Created by Michael DESIGAUD on 10/11/2016.
 */
import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';

import {CustomerModule} from './customer/customer.module';
import {CustomersModule} from './customers/customers.module';
import {RoutesModule} from './app.routes';
import {HeaderModule} from './header/header.module';

@NgModule({
    imports:        [ HttpModule, RouterModule, CustomerModule, CustomersModule, RoutesModule, HeaderModule ],
    declarations:   [ AppComponent ],
    bootstrap:      [ AppComponent ],
    providers:      [ {provide: LocationStrategy, useClass: HashLocationStrategy} ]
})
export class AppModule { }
