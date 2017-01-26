import {PipeTransform,Pipe} from '@angular/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value ? Object.keys(value).map((key) => {return {value:value[key],key:key};}) : value;
    }
}
