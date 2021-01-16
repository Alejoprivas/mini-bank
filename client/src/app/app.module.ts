import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewslistComponent } from './core/components/newslist/newslist.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import {MaterialModule} from './material.module';
import { DateChangerPipe } from './pipes/date-changer.pipe';
import { AlertComponent } from './core/components/alert/alert.component';
import { AlertService } from './core/services/alert.service';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    NewslistComponent,
    DateChangerPipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CoreModule
  ],
  exports: [AlertComponent],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
