import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaListaComponent } from './factura-lista.component';

describe('FacturaListaComponent', () => {
  let component: FacturaListaComponent;
  let fixture: ComponentFixture<FacturaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
