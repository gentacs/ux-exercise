import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListForText'
})
export class FilterListForTextPipe implements PipeTransform {

  transform(list: any, args?: any): any {
    return list && args ? list.filter(obj => {
        let found = false;
        Object.keys(obj).forEach(key => {
            const txt = obj[key].toString().toUpperCase();
            const txtToSearch = args ? args.toString().toUpperCase() : '';

            if (txt.search(txtToSearch) !== -1) {
                found = true;
            };
        });
        
        return found;
    }) : list;
  }

}
