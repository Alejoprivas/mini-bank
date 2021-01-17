import { Directive, Attribute  } from '@angular/core';  
import { Validator,  NG_VALIDATORS } from '@angular/forms';  


@Directive({  
  selector: '[rut]',  
  providers: [{provide: NG_VALIDATORS, useExisting: RutValidateDirective, multi: true}]  
})  

export class RutValidateDirective implements Validator {  

    validate(c: any): {[key: string]: any} {
        //console.log(c.value)
        //return { rut: true };
        let valor 
        if(c.value) {valor = c.value} else {return {rut: true}};  
        
        valor = valor.replace('-','');
        
        // Aislar Cuerpo y Dígito Verificador
        let cuerpo = valor.slice(0,-1);
        let dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        c.value = cuerpo + '-'+ dv
        
        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) { console.log('Rut menor cantidad'); return {rut: true};}
        
        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;
        
        // Para cada dígito del Cuerpo
        for(let i=1;i<=cuerpo.length;i++) {
        
            // Obtener su Producto con el Múltiplo Correspondiente
            let index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
      
        }
        
        // Calcular Dígito Verificador en base al Módulo 11
        let dvEsperado = 11 - (suma % 11);
        
        // Casos Especiales (0 y K)
        dv = (dv == 'K')?10:dv;
        dv = (dv == 0)?11:dv;
        //*/
        // Validar que el Cuerpo coincide con su Dígito Verificador
        if(dvEsperado != dv) {  console.log('verificador equivocado');return {rut: true}; }
        
        // Si todo sale bien, eliminar errores (decretar que es válido)
        //rut.setCustomValidity('');
    }  

}  