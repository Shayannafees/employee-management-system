import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  message: string = '';
  type: string = '';
  show: boolean = false;

  showToast(message: string, type: string){
    this.message = message;
    this.type = type;
    this.show = true;


    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
