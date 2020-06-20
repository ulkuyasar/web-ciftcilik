import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesensortransactionComponent } from './managesensortransaction.component';

describe('ManagesensortransactionComponent', () => {
  let component: ManagesensortransactionComponent;
  let fixture: ComponentFixture<ManagesensortransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesensortransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesensortransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
