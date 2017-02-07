import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

//COmponentes primefaces// Esto lo uso para la grilla
import {DataTableModule,SharedModule,DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanelModule} from 'primeng/primeng';
import {ConfirmDialogModule,GrowlModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { VentaComponent } from './venta.component';

@NgModule({
  declarations: [
    AppComponent, VentaComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DataTableModule,SharedModule, ButtonModule,DialogModule, DataListModule,
    OverlayPanelModule,ConfirmDialogModule,GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
