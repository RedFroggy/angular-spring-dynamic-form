import {bootstrap}    from 'angular2/platform/browser';
import {provide}    from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy,HashLocationStrategy } from 'angular2/router';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http,RequestOptions, XHRBackend} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);