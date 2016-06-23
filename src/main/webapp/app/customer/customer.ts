import {Component,Inject} from '@angular/core';
import {Router} from '@angular/router';
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
    private sub:any;
    constructor(private http:Http,private router:Router,private form: FormBuilder) {
        this.customer = {};
        this.nbErrors = 0;


        this.customerForm = form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.customerForm.valueChanges.subscribe(() => {
            if(this.customerForm.errors) {
                this.nbErrors = Object.keys(this.customerForm.errors).length;
            }
        });
    }
    ngOnInit() {
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.isEdition = !!params['id'];

                if(this.isEdition) {
                    this.getCustomer(params['id']);
                } else {
                    this.customer.extraFields = {};
                    this.customerPromise = Promise.resolve(this.customer);
                }
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    getCustomer(id:string):void {
        this.customerPromise = this.http.get('http://localhost:8080/api/customers/'+id)
            .map(res => res.json()).toPromise();

        this.customerPromise.then((customer:any) => {
            this.customer = customer;
            return customer;
        });
    }
    cancel():void {
        this.router.navigate(['/customers']);
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
