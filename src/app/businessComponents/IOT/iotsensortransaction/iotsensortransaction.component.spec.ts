import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotsensortransactionComponent } from './iotsensortransaction.component';

describe('IotsensortransactionComponent', () => {
  let component: IotsensortransactionComponent;
  let fixture: ComponentFixture<IotsensortransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotsensortransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotsensortransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
