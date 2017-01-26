/**
 * Application routes
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {Customer} from './customer/customer';
import {Customers} from './customers/customers';

const routes: Routes = [
    {path: 'customers', component: Customers},
    {path: 'customer/create', component: Customer},
    {path: 'customer/:id', component: Customer},
    {path: '', component: Customers},
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(routes);
