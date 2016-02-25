import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http} from 'angular2/http';

@Component({
    selector: 'customers',
    templateUrl: './app/customers/customers.html'
})
export class Customers {
    customers:Array<any>;
    constructor(private http:Http) {
        http.get('http://localhost:8080/api/customers').map(res => res.json()).subscribe((customers:Array<any>) => {
            this.customers = customers;
        });
     }
}