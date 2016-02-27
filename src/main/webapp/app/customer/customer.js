var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var common_1 = require('angular2/common');
var extra_form_1 = require('../form/extra-form');
var control_messages_1 = require('../form/error/control-messages');
let Customer = class {
    constructor(http, router, form, routeParams, routeData) {
        this.http = http;
        this.router = router;
        this.form = form;
        this.routeParams = routeParams;
        this.customer = {};
        this.nbErrors = 0;
        this.isEdition = routeData.get('isEdition');
        this.customerForm = form.group({
            firstName: ['', common_1.Validators.required],
            lastName: ['', common_1.Validators.required]
        });
        this.customerForm.valueChanges.subscribe(() => {
            if (this.customerForm.errors) {
                this.nbErrors = Object.keys(this.customerForm.errors).length;
            }
        });
        if (this.isEdition) {
            this.getCustomer();
        }
    }
    getCustomer() {
        this.customerPromise = this.http.get('http://localhost:8080/api/customers/' + this.routeParams.get('id'))
            .map(res => res.json()).toPromise();
        this.customerPromise.then((customer) => {
            this.customer = customer;
            return customer;
        });
    }
    cancel() {
        this.router.navigate(['Customers']);
    }
    saveCustomer() {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        let reqOptions = {};
        reqOptions.body = JSON.stringify(this.customer);
        reqOptions.headers = headers;
        this.isEdition ? reqOptions.method = 'PUT' : reqOptions.method = 'POST';
        this.http.request('http://localhost:8080/api/customers', reqOptions)
            .map(res => res.json())
            .subscribe(() => this.router.navigate(['Customers']));
    }
};
Customer = __decorate([
    core_1.Component({
        selector: 'customer',
        templateUrl: './app/customer/customer.html',
        directives: [extra_form_1.DynamicForm, control_messages_1.ControlMessages]
    }), 
    __metadata('design:paramtypes', [http_1.Http, router_1.Router, common_1.FormBuilder, router_1.RouteParams, router_1.RouteData])
], Customer);
exports.Customer = Customer;
