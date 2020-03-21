import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerDetailComponent } from './user-customer-detail.component';

describe('UserCustomerDetailComponent', () => {
  let component: UserCustomerDetailComponent;
  let fixture: ComponentFixture<UserCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
