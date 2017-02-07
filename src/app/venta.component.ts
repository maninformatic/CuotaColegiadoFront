import { Component } from '@angular/core';

// Componentes de primefaces
import {DataTableModule,SharedModule, DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanel} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService, GrowlModule, Message} from 'primeng/primeng';

@Component({
  selector: 'venta-selector',
  templateUrl: './venta.component.html'  
})
export class VentaComponent {
    private enviosPresentar:any = [];
    title = 'app works Ronald12333!';
}