import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerAdresComponent } from './user-customer-adres.component';

describe('UserCustomerAdresComponent', () => {
  let component: UserCustomerAdresComponent;
  let fixture: ComponentFixture<UserCustomerAdresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerAdresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerAdresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
