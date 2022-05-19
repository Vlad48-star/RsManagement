import { Injectable } from '@angular/core';

@Injectable()
export class FormValidatorService {
  emailValidatorRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
}
