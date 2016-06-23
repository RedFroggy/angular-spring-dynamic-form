import {ROUTER_DIRECTIVES, RouterConfig, Router,provideRouter} from '@angular/router';
import {Customers} from './customers/customers';
import {Customer} from './customer/customer';

export const routes: RouterConfig = [
    {path: 'customers', component: Customers},
    {path: 'customer/create', component: Customer},
    {path: 'customer/:id', component: Customer},
    {path: '', component: Customers}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];