import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {ExtraForm} from '../form/extra-form';
import {FORM_DIRECTIVES} from "angular2/common";

@Component({
    selector: 'customer',
    templateUrl: './app/customer/customer.html',
    directives:[ExtraForm,FORM_DIRECTIVES]
})
export class Customer {
    customerForm:ControlGroup;
    customer:any;
    constructor(private http:Http,private router:Router,private form: FormBuilder,private routeParams:RouteParams) {
        this.customer = {};

        this.customerForm = form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
        this.getCustomer();
    }
    getCustomer():void {
        this.http.get('http://localhost:8080/api/customers/'+this.routeParams.get('id')).map(res => res.json()).subscribe((customer:any) => {
            this.customer = customer;
        });
    }
    cancel():void {
        this.router.navigate(['Customers']);
    }
    saveCustomer():void {
        console.log(this.customer);
    }
}
