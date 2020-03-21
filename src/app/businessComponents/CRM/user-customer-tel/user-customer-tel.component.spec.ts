import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerTelComponent } from './user-customer-tel.component';

describe('UserCustomerTelComponent', () => {
  let component: UserCustomerTelComponent;
  let fixture: ComponentFixture<UserCustomerTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerTelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
