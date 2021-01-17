
import { Directive, Attribute , HostListener, Input } from '@angular/core';  


@Directive({  
  selector: '[rut-limit]'
})  

export class RutlimitDirective  {  
    @Input('rut-limit') rut: any;
    @HostListener("keydown", ["$event"]) onKeyDown(event) {
        let length = this.rut?this.rut.length:0;
        /*
        if (event.which == 64 || event.which == 16 && elm.val().length > 4) {
            return false;
        } else
        //*/ 
        
        if (length > 9 && [8, 9, 46, 13, 27, 37, 38, 39, 40].indexOf(event.which) == -1){
          event.preventDefault();
          return false;
        }else if ([8, 9, 46, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1 /*&& elm.val().length > 4*/) {
          return true;
        }else if ((event.which >= 48 && event.which <= 57)||(event.which >= 96 && event.which <= 105)) {
            return true;
        }  else if (event.which == 75 && length > 7) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
       
    }

}  