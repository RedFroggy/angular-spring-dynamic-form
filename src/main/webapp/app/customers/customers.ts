import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http} from 'angular2/http';
import {ValuesPipe} from '../pipes/values.pipe';

@Component({
    selector: 'customers',
    pipes:[ValuesPipe],
    templateUrl: './app/customers/customers.html'
})
export class Customers {
    customers:Array<any>;
    constructor(private http:Http,private router: Router) {
        http.get('http://localhost:8080/api/customers').map(res => res.json()).subscribe((customers:Array<any>) => {
            this.customers = customers;
        });
    }
    onSelectCustomer(event:Event,id:number):void {
        event.preventDefault();
        this.router.navigate(['CustomerEdit',{id:id}]);
    }
    addCustomer():void {
        this.router.navigate(['CustomerCreate']);
    }
    isTypeImage(extraField:any):boolean {
        return extraField && extraField.value.indexOf('data:image') !== -1;
    }
    isTypeApplication(extraField:any):boolean {
        return extraField && extraField.value.indexOf('data:application') !== -1;
    }
}
