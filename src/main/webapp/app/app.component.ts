import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,Router} from '@angular/router';
import {Header} from './header/header';


@Component({
    selector: 'dynamic-app',
    templateUrl:'./app/app.html',
    directives: [ROUTER_DIRECTIVES,Header]
})
export class AppComponent {
    constructor(private router:Router) {}
    ngOnInit() {
        this.router.navigate(['/customers']);
    }
}
