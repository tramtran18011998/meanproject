import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KtraGiohangComponent } from './ktra-giohang.component';

describe('KtraGiohangComponent', () => {
  let component: KtraGiohangComponent;
  let fixture: ComponentFixture<KtraGiohangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KtraGiohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KtraGiohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
