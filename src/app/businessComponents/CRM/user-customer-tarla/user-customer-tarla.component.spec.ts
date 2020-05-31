import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerTarlaComponent } from './user-customer-tarla.component';

describe('UserCustomerTarlaComponent', () => {
  let component: UserCustomerTarlaComponent;
  let fixture: ComponentFixture<UserCustomerTarlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerTarlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerTarlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
