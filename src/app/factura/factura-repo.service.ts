import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../modelo/factura';
import { ClienteRepoService } from '../cliente/cliente-repo.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaRepoService {

  ENDPOINT = " http://localhost:3000/factura";

  private listaFacturas: Factura[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _clienteRepo: ClienteRepoService    ) { }

  loadAll() {
    return new Promise ((success , reject) => {
      // primero se obtienen los clientes
      this._clienteRepo.loadAll().then(() => {
        // cuando se terminan de recibir todos los datos de los clientes, buscamos las facturas
        this._httpClient.get<Factura[]>(this.ENDPOINT)
        .subscribe(
          // por cada factura recibida, se busca el cliente en el array del servicio y se copia
          // en la factura
          facturas => {
            this.listaFacturas = facturas.map(
              factura => {
                const cliente = this._clienteRepo.getAll().find(cliente => cliente.id == factura.clienteID);
                factura.cliente = cliente;
                return factura;
              }
            );
            success();
        }
      ) 
        },
        err => {
          alert(`Error al obtener los datos: \n${err.message}`);
          reject(err);
        }
      );
    });
  }

  getAll(){
    return this.listaFacturas;
  }

  getById_DB(facturaID:number): Observable<Factura> {
    return this._httpClient.get<Factura>(`${this.ENDPOINT}/${facturaID}`);
  }

  agregar(nuevaFactura:Factura): Observable<any> {
    return this._httpClient.post(this.ENDPOINT, nuevaFactura)
  }

  borrar(facturaID:number): Observable<any> {
    return this._httpClient.delete(`${this.ENDPOINT}/${facturaID}`)
  }

  actualizar(factura:Factura): Observable<any> {
    return this._httpClient.put(`${this.ENDPOINT}/${factura.id}`, factura)
  }

}