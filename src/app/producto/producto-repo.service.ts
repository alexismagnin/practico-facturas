import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoRepoService {

  ENDPOINT = " http://localhost:3000/producto";

  private listaProductos: Producto[] = [];

  constructor(private _httpClient: HttpClient) { }

  loadAll() {
    return new Promise ((success , reject) => {
      this._httpClient.get<Producto[]>(this.ENDPOINT)
      .subscribe(
        productos => {
          this.listaProductos = productos;
          success();
        },
        err => {
          alert(`Error al obtener los datos: \n${err.message}`);
          reject(err);
        }
      );
    });
  }

  getAll(){
    return this.listaProductos;
  }

  getById(productoID:number): Observable<Producto> {
    return this._httpClient.get<Producto>(`${this.ENDPOINT}/${productoID}`)
  }

  agregar(nuevoProducto:Producto): Observable<any> {
    return this._httpClient.post(this.ENDPOINT, nuevoProducto)
  }

  borrar(productoID:number): Observable<any> {
    return this._httpClient.delete(`${this.ENDPOINT}/${productoID}`)
  }

  actualizar(producto:Producto): Observable<any> {
    return this._httpClient.put(`${this.ENDPOINT}/${producto.id}`, producto)
  }

}