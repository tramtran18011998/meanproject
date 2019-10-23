import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinKmComponent } from './tin-km.component';

describe('TinKmComponent', () => {
  let component: TinKmComponent;
  let fixture: ComponentFixture<TinKmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinKmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
