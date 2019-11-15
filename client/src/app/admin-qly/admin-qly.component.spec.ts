import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQlyComponent } from './admin-qly.component';

describe('AdminQlyComponent', () => {
  let component: AdminQlyComponent;
  let fixture: ComponentFixture<AdminQlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
