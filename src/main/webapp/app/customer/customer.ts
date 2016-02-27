import {Component} from 'angular2/core';
import {Router, RouteParams,RouteData} from 'angular2/router';
import {Http,Headers,RequestOptionsArgs} from 'angular2/http';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {DynamicForm} from '../form/extra-form';

@Component({
    selector: 'customer',
    templateUrl: './app/customer/customer.html',
    directives:[DynamicForm]
})
export class Customer {
    customerForm:ControlGroup;
    customer:any;
    isEdition:boolean;
    constructor(private http:Http,private router:Router,private form: FormBuilder,private routeParams:RouteParams,routeData: RouteData) {
        this.customer = {};
        this.isEdition = routeData.get('isEdition');
        console.log(this.isEdition);

        this.customerForm = form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        if(this.isEdition) {
            this.getCustomer();
        }
    }
    getCustomer():void {
        this.http.get('http://localhost:8080/api/customers/'+this.routeParams.get('id'))
            .map(res => res.json())
            .subscribe((customer:any) => this.customer = customer);
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

        this.http.request('http://localhost:8080/api/customers/',reqOptions)
            .map(res => res.json())
            .subscribe(() => this.router.navigate(['Customers']));
    }
}
