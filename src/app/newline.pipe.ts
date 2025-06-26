import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline',
})
export class NewlinePipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null) return '';
    return value.replace(/\n/g, '<br>');
  }
}
