import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { ProductoRepoService } from '../producto-repo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: []
})

export class ProductoFormComponent implements OnInit {

  producto: Producto = new Producto();
  modificar: boolean = false;
  ngOnInit() {
  }
  constructor(
    private _productoRepo: ProductoRepoService,
    activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
        {
          this.modificar = _router.url.indexOf('editar') !== -1;      
          if(this.modificar){
            // el id viene en la ruta (/provincia/editar/1 por ejemplo), se obtiene gracias al obj activatedRoute
            const idProducto: number = parseInt(activatedRoute.snapshot.paramMap.get('idProducto'), 10);
            if(idProducto){
              // si hay un id válido, se obtienen sus datos para editar
              this.obtenerProducto(idProducto);
            } else {
              // el id no es válido: se rechaza el pedido y se navega de vuelta a la pagina anterior
              alert(`Debe especificar un id válido`);
              this.volverAlListado(this._router)
            }
          }
        }
  }

  obtenerProducto(idProducto: number) {
    this._productoRepo.getById(idProducto)
      .subscribe(
        producto => this.producto = producto,
        err => {
          alert(`Producto no encontrado: (${idProducto}):\n`+
            `${err.message}`)
          this.volverAlListado(this._router)
        }
      )
  }

  private volverAlListado(router: Router) {
    router.navigate(['/productos'])
  }

  guardar(){
    if(this.modificar){
      this._productoRepo.actualizar(this.producto)
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
      this._productoRepo.agregar(this.producto)
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
