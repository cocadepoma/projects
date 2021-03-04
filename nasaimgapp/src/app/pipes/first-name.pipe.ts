import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
})
export class FirstNamePipe implements PipeTransform {
  transform(name: string): string {
    if (!name) {
      return '';
    }
    return name.split(' ')[0];
  }
}
