import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotsensortransactionshowComponent } from './iotsensortransactionshow.component';

describe('IotsensortransactionshowComponent', () => {
  let component: IotsensortransactionshowComponent;
  let fixture: ComponentFixture<IotsensortransactionshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotsensortransactionshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotsensortransactionshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
