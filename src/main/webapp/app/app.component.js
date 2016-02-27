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
var header_1 = require('./header/header');
var customers_1 = require('./customers/customers');
var customer_1 = require('./customer/customer');
let AppComponent = class {
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-app',
        templateUrl: './app/app.html',
        directives: [router_1.ROUTER_DIRECTIVES, header_1.Header]
    }),
    router_1.RouteConfig([
        new router_1.Route({ path: '/customers', component: customers_1.Customers, name: 'Customers', useAsDefault: true }),
        new router_1.Route({ path: '/customer/create', component: customer_1.Customer, name: 'CustomerCreate', data: { isEdition: false } }),
        new router_1.Route({ path: '/customer/:id', component: customer_1.Customer, name: 'CustomerEdit', data: { isEdition: true } })
    ]), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
