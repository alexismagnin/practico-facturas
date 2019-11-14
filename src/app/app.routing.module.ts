import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente/cliente-lista/cliente-lista.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { ProductoListaComponent } from './producto/producto-lista/producto-lista.component';
import { FacturaFormComponent } from './factura/factura-form/factura-form.component';
import { FacturaListaComponent } from './factura/factura-lista/factura-lista.component';

const COMPONENTES = [
  ClienteFormComponent,
  ClienteListaComponent,
  ProductoFormComponent,
  ProductoListaComponent,
  FacturaFormComponent,
  FacturaListaComponent,
  // ErrorPageComponent,
];


const ROUTES: Routes = [
  //RUTAS - CLIENTES
  {
    path: 'clientes',
    component: ClienteListaComponent,
  },
  {
    path: 'cliente/editar/:idCliente',
    component: ClienteFormComponent,
  },
  {
    path: 'cliente/nuevo',
    component: ClienteFormComponent,
  },

  //RUTAS - PRODUCTOS
  {
    path: 'productos',
    component: ProductoListaComponent,
  },
  {
    path: 'producto/editar/:idProducto',
    component: ProductoFormComponent,
  },
  {
    path: 'producto/nuevo',
    component: ProductoFormComponent,
  },

  //RUTAS - FACTURA
  {
    path: 'facturas',
    component: FacturaListaComponent,
  },
  {
    path: 'factura/detalle/:idFactura',
    component: FacturaFormComponent,
  },
  {
    path: 'factura/nueva',
    component: FacturaFormComponent,
  },

  //RUTAS GENERICAS
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'facturas',
  }/* ,
  {
    path: '**',
    component: ErrorPageComponent,
  } */
];


@NgModule({
  declarations: COMPONENTES,
  exports:[
    ...COMPONENTES,
    RouterModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
  ],
})
export class AppRoutingModule { }
