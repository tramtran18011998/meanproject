import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaDonComponent } from './hoa-don.component';

describe('HoaDonComponent', () => {
  let component: HoaDonComponent;
  let fixture: ComponentFixture<HoaDonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoaDonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoaDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
