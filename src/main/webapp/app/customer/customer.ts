import {Component,Inject} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {Http,Headers,RequestOptionsArgs} from '@angular/http';
import {FormBuilder, Validators, ControlGroup,NgFormModel} from '@angular/common';
import {DynamicForm} from '../form/extra-form';
import {ControlMessages} from '../form/error/control-messages';

@Component({
    selector: 'customer',
    templateUrl: './app/customer/customer.html',
    directives:[DynamicForm,ControlMessages]
})
export class Customer {
    customerForm:ControlGroup;
    customer:any;
    customerPromise:Promise;
    isEdition:boolean;
    nbErrors:number;
    constructor(private http:Http,private router:Router,private form: FormBuilder,private routeSegment:RouteSegment) {
        this.customer = {};
        this.nbErrors = 0;
        this.isEdition = !!routeSegment.getParam('id');

        this.customerForm = form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.customerForm.valueChanges.subscribe(() => {
            if(this.customerForm.errors) {
                this.nbErrors = Object.keys(this.customerForm.errors).length;
            }
        });

        if(this.isEdition) {
            this.getCustomer();
        } else {
            this.customer.extraFields = {};
            this.customerPromise = Promise.resolve(this.customer);
        }
    }
    getCustomer():void {
        this.customerPromise = this.http.get('http://localhost:8080/api/customers/'+this.routeSegment.getParam('id'))
            .map(res => res.json()).toPromise();

        this.customerPromise.then((customer:any) => {
            this.customer = customer;
            return customer;
        });
    }
    cancel():void {
        this.router.navigate(['Customers']);
    }
    saveCustomer():void {
        let headers = new Headers();
        headers.append('Content-Type','application/json');

        let reqOptions:RequestOptionsArgs = {};
        reqOptions.body = JSON.stringify(this.customer);
        reqOptions.headers = headers;
        this.isEdition ? reqOptions.method ='PUT' : reqOptions.method ='POST';

        this.http.request('http://localhost:8080/api/customers',reqOptions)
            .map(res => res.json())
            .subscribe(() => this.router.navigate(['/customers']));
    }
}
