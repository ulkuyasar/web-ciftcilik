import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotsensortransactionhistoryComponent } from './iotsensortransactionhistory.component';

describe('IotsensortransactionhistoryComponent', () => {
  let component: IotsensortransactionhistoryComponent;
  let fixture: ComponentFixture<IotsensortransactionhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotsensortransactionhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotsensortransactionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
