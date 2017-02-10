import { Injectable } from '@angular/core';
import { Headers, Http ,Response,RequestOptions} from '@angular/http';
//import './rxjs-extensions';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PersonaService {
	private baseUrl: string = 'http://cuotacolegiado-cuotacolegiado.44fs.preview.openshiftapps.com/CuotaColegiado/rest/persona/';
    //private baseUrl: string = 'http://localhost:8081/TramiteDocumentarioJava/rest/tramites/';
    constructor(private http: Http) { }
    getAllPersonaByTermino(termino: string,tiPe:number) {
        return this.http
                .get(this.baseUrl+ "getallpersonabytermino?termino="+termino+"&tiPe="+tiPe) 
                .map((r: Response) => r.json() )             
                .catch(this.handleError);
	}
    newPersona(){
		return this.http
			.get(this.baseUrl+ 'new')
			.map((r: Response) => r.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
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