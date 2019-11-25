import { Component, OnInit } from '@angular/core';
import { ClienteRepoService } from '../cliente-repo.service';
import { Cliente } from 'src/app/modelo/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: []
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  modificar: boolean = false;

  constructor(
    private _clienteRepo: ClienteRepoService,
    activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
        {
          this.modificar = _router.url.indexOf('editar') !== -1;      
          if(this.modificar){
            // el id viene en la ruta (/provincia/editar/1 por ejemplo), se obtiene gracias al obj activatedRoute
            const idCliente: number = parseInt(activatedRoute.snapshot.paramMap.get('idCliente'), 10);
            if(idCliente){
              // si hay un id válido, se obtienen sus datos para editar
              this.obtenerCliente(idCliente);
            } else {
              // el id no es válido: se rechaza el pedido y se navega de vuelta a la pagina anterior
              alert(`Debe especificar un id válido`);
              this.volverAlListado(this._router)
            }
          }
        }
  }

  ngOnInit() {
  }

  obtenerCliente(idCliente: number) {
    this._clienteRepo.getById(idCliente)
      .subscribe(
        cliente => this.cliente = cliente,
        err => {
          alert(`Cliente no encontrado: (${idCliente}):\n`+
            `${err.message}`)
          this.volverAlListado(this._router)
        }
      )
  }

  private volverAlListado(router: Router) {
    router.navigate(['/clientes'])
  }

  guardar(){
    if(this.modificar){
      this._clienteRepo.actualizar(this.cliente)
      .subscribe(
        () => {
          this.volverAlListado(this._router);
        },        
        error => {
          alert(`Error de persistencia: ${error.message}`);
          }       
      );
      this.modificar = false; 
    } else {
      this._clienteRepo.agregar(this.cliente)
      .subscribe(
        () => {
          this.volverAlListado(this._router);
        },
        error => {
          alert(`Error de persistencia: ${error.message}`);
        } 
      );
    }
  }
}
