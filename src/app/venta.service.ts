import { Injectable } from '@angular/core';
import { Headers, Http ,Response,RequestOptions} from '@angular/http';
//import './rxjs-extensions';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class VentaService {
	private baseUrl: string = 'http://cuotacolegiado-cuotacolegiado.44fs.preview.openshiftapps.com/CuotaColegiado/rest/venta/';
    //private baseUrl: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
    constructor(private http: Http) { }
    getAllVentaByMes(mes: number) {
        return this.http
                .get(this.baseUrl+ "getallventabymes?mes="+mes) 
                .map((r: Response) => r.json() )             
                .catch(this.handleError);
	}
    	// this could also be a private method of the component class
	handleError (error: any) {
        // log error
        // could be something more sofisticated
        let errorMsg = error.message;// || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return Observable.throw(errorMsg);
	}
}