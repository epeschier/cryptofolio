import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule  } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoinService } from './services/coin.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule.forRoot(), 
    BrowserModule, HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  providers: [CoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
