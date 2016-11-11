import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http,Headers,RequestOptionsArgs} from '@angular/http';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';


@Component({
    selector: 'customer',
    templateUrl: './app/customer/customer.html'
})
export class Customer {
    customerGroup:FormGroup;
    customer:any;
    customerPromise:Promise<any>;
    isEdition:boolean;
    nbErrors:number;
    private sub:any;
    constructor(private route:ActivatedRoute, private http:Http, private router:Router, private form: FormBuilder) {
        this.customer = {};
        this.nbErrors = 0;

        this.customerGroup = form.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required])
        });

        this.customerGroup.valueChanges.subscribe(() => {
            if(this.customerGroup.errors) {
                this.nbErrors = Object.keys(this.customerGroup.errors).length;
            }
        });
    }
    ngOnInit() {
        this.route.params
            .forEach(params => {
                this.isEdition = !!params['id'];

                if(this.isEdition) {
                    this.getCustomer(params['id']);
                } else {
                    this.customer.extraFields = {};
                    this.customerPromise = Promise.resolve(this.customer);
                }
            });
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
