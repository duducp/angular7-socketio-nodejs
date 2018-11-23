import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import * as moment from 'moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ViewActionsComponent } from './pages/view-actions/view-actions.component';
import { SetActionsComponent } from './pages/set-actions/set-actions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';

moment.locale('pt-BR');
registerLocaleData(localePt, 'pt-BR');
const config: SocketIoConfig = { url: 'http://localhost:3001', options: { reconnection: true } };

@NgModule({
  declarations: [
    AppComponent,
    ViewActionsComponent,
    SetActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    SocketIoModule.forRoot(config),
    CurrencyMaskModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
