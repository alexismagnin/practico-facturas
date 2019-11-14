import { Component, OnInit } from '@angular/core';
import { FacturaRepoService } from '../factura-repo.service';

@Component({
  selector: 'app-factura-lista',
  templateUrl: './factura-lista.component.html',
  styleUrls: ['./factura-lista.component.css']
})
export class FacturaListaComponent implements OnInit {

  constructor(private _facturaRepo: FacturaRepoService) { }

  ngOnInit() {
    this._facturaRepo.loadAll();
  }

}
