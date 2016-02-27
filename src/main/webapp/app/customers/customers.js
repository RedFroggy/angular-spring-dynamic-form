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
var values_pipe_1 = require('../pipes/values.pipe');
let Customers = class {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        http.get('http://localhost:8080/api/customers').map(res => res.json()).subscribe((customers) => {
            this.customers = customers;
        });
    }
    onSelectCustomer(event, id) {
        event.preventDefault();
        this.router.navigate(['CustomerEdit', { id: id }]);
    }
    addCustomer() {
        this.router.navigate(['CustomerCreate']);
    }
    showExtraField() {
        return true;
    }
    isTypeImage(extraField) {
        return extraField && extraField.value.indexOf('data:image') !== -1;
    }
    isTypeApplication(extraField) {
        return extraField && extraField.value.indexOf('data:application') !== -1;
    }
};
Customers = __decorate([
    core_1.Component({
        selector: 'customers',
        pipes: [values_pipe_1.ValuesPipe],
        templateUrl: './app/customers/customers.html'
    }), 
    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
], Customers);
exports.Customers = Customers;
