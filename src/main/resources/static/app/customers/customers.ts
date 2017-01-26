import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
    selector: 'customers',
    templateUrl: './app/customers/customers.html'
})
export class Customers {
    customers:Array<any>;
    constructor(private http:Http,private router: Router) {
        http.get('http://localhost:8080/api/customers').map(res => res.json()).subscribe((customers:Array<any>) =>  this.customers = customers);
    }
    onSelectCustomer(event:Event,id:number):void {
        event.preventDefault();
        this.router.navigate(['/customer',id]);
    }
    addCustomer():void {
        this.router.navigate(['/customer/create']);
    }
    isTypeImage(extraField:any):boolean {
        return extraField && extraField.value.indexOf('data:image') !== -1;
    }
    isTypeApplication(extraField:any):boolean {
        return extraField && extraField.value.indexOf('data:application') !== -1;
    }
}
