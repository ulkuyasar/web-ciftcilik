import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilBaseMasterCrudTheOtherTwoComponent } from './yil-base-master-crud-the-other-two.component';

describe('YilBaseMasterCrudTheOtherTwoComponent', () => {
  let component: YilBaseMasterCrudTheOtherTwoComponent;
  let fixture: ComponentFixture<YilBaseMasterCrudTheOtherTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilBaseMasterCrudTheOtherTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilBaseMasterCrudTheOtherTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
