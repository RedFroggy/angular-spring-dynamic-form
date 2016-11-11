import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'dynamic-app',
    templateUrl:'./app/app.html'
})
export class AppComponent {
    constructor(private router:Router) {}
    ngOnInit() {
        this.router.navigate(['/customers']);
    }
}
