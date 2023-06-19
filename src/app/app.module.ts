import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStocksComponent } from './pages/user-stocks/user-stocks.component';
import ptBr from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserStocksService } from './services/user-stocks.service';
import { ApiHttpService } from './services/api-http.service';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeModule } from './pages/home/home.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserStocksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    ApiHttpService,
    UserStocksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
