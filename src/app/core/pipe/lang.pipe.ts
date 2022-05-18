import { Pipe, PipeTransform } from '@angular/core';
import * as language from 'src/assets/data/language.json';

@Pipe({
  name: 'lang',
})
export class LangPipe implements PipeTransform {
  transform(value: any) {
    if (localStorage.getItem('lang') === 'ru') {
      return value.langText.ru;
    } else {
      return value.langText.en;
    }
  }
}
