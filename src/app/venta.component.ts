import { Component } from '@angular/core';

// Componentes de primefaces
import {DataTableModule,SharedModule, DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanel} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService, GrowlModule, Message} from 'primeng/primeng';

import { VentaService } from './venta.service';

@Component({
  selector: 'venta-selector',
  templateUrl: './venta.component.html'  
})
export class VentaComponent {
	private usId:number;
	private usFechaReg:Date;

	private ventas:any=[];
	private ventasPresentar:any = [];	
	private venta:any;
	private selectedVentaPresentar: any;
	
	//mesage de error 
	private isLoading: boolean = false;  
	private errorMessage:string='';
	//propiedades de modal
	private displayDialog: boolean=false;
	private headerTitle:string;

	constructor(private _ventaService: VentaService){ 


	}
	ngOnInit(){
		this.usId=1; // este usuario es obtenido del login
		this.usFechaReg=new Date();
		this.getAllVentaByMes(2);//this.usFechaReg.getMonth()
	}
	getAllVentaByMes(mes: number) {
		this._ventaService.getAllVentaByMes(mes)
			.subscribe(
			data => { this.ventas = data;			 
						this.mostrarGrillaVenta();},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	mostrarGrillaVenta(){
		this.ventasPresentar=[];
		let _valorDoc:string="";
		for(let venta of this.ventas ){
			this.ventasPresentar.push(
				{
					VeId: venta.VeId, PerNroDocumento: venta.PerNroDocumento, RSocial: venta.RSocial,
                   DoCodigo: venta.DoCodigo, NroDoc: venta.NroDoc, Total: venta.Total
                   
				}
			);

		}  
	}
	addVenta(){
		this._ventaService.newVenta()
			.subscribe(
			data => { this.venta = data;						
					this.cargarDatosModal();					
						},//lo llamo aqui xq sino le pierde el estado
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);
	}
	cargarDatosModal(){
		this.displayDialog=true;
		if (this.venta.Id > 0)
		this.headerTitle = 'Editar Venta';
		else
		this.headerTitle = 'Nueva Venta';

	}

}