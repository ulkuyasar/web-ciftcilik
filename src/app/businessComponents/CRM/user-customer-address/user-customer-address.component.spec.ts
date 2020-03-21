import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerAddressComponent } from './user-customer-address.component';

describe('UserCustomerAddressComponent', () => {
  let component: UserCustomerAddressComponent;
  let fixture: ComponentFixture<UserCustomerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
