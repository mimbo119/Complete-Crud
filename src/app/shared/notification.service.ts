import { Injectable } from '@angular/core';
import { MatSnackBar , MatSnackBarConfig} from '@angular/material'; 

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( public snack : MatSnackBar) { }

  config : MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition: 'right',
    verticalPosition : 'top',
    politeness: 'assertive'
  }

  success(msg){
    this.config['panelClass'] = ['notification' , 'success']
    this.snack.open(msg, '', this.config);
  }

  clear(msg){
    this.config['panelClass'] = ['notification' , 'clear']
    this.snack.open(msg, '', this.config);
  }

  update(msg){
    this.config['panelClass'] = ['notification' , 'update']
    this.snack.open(msg, '', this.config);
  }

}
