import { NgModule } from "@angular/core";
import { RutlimitDirective } from "./core/_auth/directives/rut-limit.directive";
import { RutValidateDirective } from "./core/_auth/directives/rut-validate.directive";

@NgModule({
    declarations: [RutValidateDirective,RutlimitDirective],
    exports:[RutValidateDirective,RutlimitDirective]
   })
export class DirectivesModule{}