import { Component, OnInit } from '@angular/core';
import { ClienteRepoService } from '../cliente-repo.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: []
})
export class ClienteListaComponent implements OnInit {

  constructor(private _clienteRepo: ClienteRepoService) { }

  ngOnInit() {
    this._clienteRepo.loadAll();
  }

  eliminarCliente(clienteID: number) {
    this._clienteRepo.borrar(clienteID)
      .subscribe(
        () => {
          //this.mostrarMensaje();
          this._clienteRepo.loadAll();
        }
      )
  }
}
