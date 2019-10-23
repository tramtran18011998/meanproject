import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiSpComponent } from './loai-sp.component';

describe('LoaiSpComponent', () => {
  let component: LoaiSpComponent;
  let fixture: ComponentFixture<LoaiSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
