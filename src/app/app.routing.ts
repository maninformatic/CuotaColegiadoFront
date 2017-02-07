import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaComponent }      from './venta.component';

const appRoutes: Routes = [
  	{
    	path: 'venta',
    	component: VentaComponent
  	}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);