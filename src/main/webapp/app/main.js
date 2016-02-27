var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var app_component_1 = require('./app.component');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/toPromise');
browser_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
