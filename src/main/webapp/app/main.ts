import {platformBrowserDynamic}    from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/toPromise';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
