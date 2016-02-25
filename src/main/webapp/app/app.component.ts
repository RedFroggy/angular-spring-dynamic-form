import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route, Router} from 'angular2/router';
import {Header} from './header/header';
import {Customers} from './customers/customers';

@Component({
    selector: 'dynamic-app',
    templateUrl:'./app/app.html',
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/customers', component: Customers, name: 'Customers',useAsDefault: true}),
    /*new Route({path: '/users', component: Users, name: 'Users'}),
    new Route({path: '/user/:id', component: User, name: 'User'})*/
])
export class AppComponent {
    constructor(router:Router) {
    }
}