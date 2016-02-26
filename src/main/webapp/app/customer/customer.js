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
var common_2 = require("angular2/common");
var Customer = (function () {
    function Customer(http, router, form, routeParams) {
        this.http = http;
        this.router = router;
        this.form = form;
        this.routeParams = routeParams;
        this.customer = {};
        this.customerForm = form.group({
            firstName: ['', common_1.Validators.required],
            lastName: ['', common_1.Validators.required]
        });
        this.getCustomer();
    }
    Customer.prototype.getCustomer = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/customers/' + this.routeParams.get('id')).map(function (res) { return res.json(); }).subscribe(function (customer) {
            _this.customer = customer;
        });
    };
    Customer.prototype.cancel = function () {
        this.router.navigate(['Customers']);
    };
    Customer.prototype.saveCustomer = function () {
        console.log(this.customer);
    };
    Customer = __decorate([
        core_1.Component({
            selector: 'customer',
            templateUrl: './app/customer/customer.html',
            directives: [extra_form_1.ExtraForm, common_2.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, common_1.FormBuilder, router_1.RouteParams])
    ], Customer);
    return Customer;
})();
exports.Customer = Customer;
