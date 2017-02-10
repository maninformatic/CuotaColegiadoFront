import { Component } from '@angular/core';
import { Subject }	from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
// Componentes de primefaces
import {DataTableModule,SharedModule, DataListModule} from 'primeng/primeng';
import {ButtonModule,DialogModule,OverlayPanel} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService, GrowlModule, Message} from 'primeng/primeng';

import { VentaService } from './venta.service';
import { PersonaService } from './persona.service';
import { DocumentoService } from './documento.service';
import { OperacionService } from './operacion.service';

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
	private nombresPersona:string;
	private documentos:any=[];
	private operacions:any=[];
	//propiedades Search
	private personasSearch:any = [];
	private searchTerms = new Subject<string>();

	constructor(private _ventaService: VentaService,private _personaService: PersonaService,
				private _documentoService: DocumentoService,private _operacionService: OperacionService){ 


	}
	ngOnInit(){
		this.usId=1; // este usuario es obtenido del login
		this.usFechaReg=new Date();
		this.getAllVentaByMes(2);//this.usFechaReg.getMonth()
		//Para el termino de searchTerms
		this.personasSearch = this.searchTerms
								.debounceTime(300)        // wait for 300ms pause in events
								.distinctUntilChanged()   // ignore if next search term is same as previous
								.switchMap(term => term   // switch to new observable each time
								// return the http search observable
								? this._personaService.getAllPersonaByTermino(term,0)
								// or the observable of empty heroes if no search term
								: Observable.of<any[]>([]))
								.catch(error => {
								// TODO: real error handling
								console.log(error);
								return Observable.of<any[]>([]);
								});

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
	getAllDocumento() {
		this._documentoService.getAllDocumento()
			.subscribe(
			data => { this.documentos = data;
				},
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	getAllOperacion() {
		this._operacionService.getAllOperacion()
			.subscribe(
			data => { this.operacions = data;
				},
			err => { this.errorMessage = err },
			() => this.isLoading = false
			);

	}
	//Busqueda por termino de busqueda Destinatario
	searchPersonaByTerm(event,termino: string, overlaypanel: OverlayPanel): void {
    this.searchTerms.next(termino);
	 overlaypanel.toggle(event);

	}
	SelectPersona(personaSelect: any,overlaypanel: OverlayPanel){
		this.venta.PeId=personaSelect.PeId;
		this.nombresPersona=personaSelect.nombres;
		
		 overlaypanel.hide();
	}

}