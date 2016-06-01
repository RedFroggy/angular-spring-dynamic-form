import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {Header} from './header/header';
import {Customers} from './customers/customers';
import {Customer} from './customer/customer';

@Component({
    selector: 'dynamic-app',
    templateUrl:'./app/app.html',
    directives: [ROUTER_DIRECTIVES,Header]
})
@Routes([
    {path: '/customers', component: Customers},
    {path: '/customer/create', component: Customer},
    {path: '/customer/:id', component: Customer},
    {path: '*', component: Customers}
])
export class AppComponent {
    constructor(private router:Router) {}
    ngOnInit() {
        this.router.navigate(['/customers']);
    }
}
