import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilBaseMasterCRUDTheOtherOneComponent } from './yil-base-master-crud-the-other-one.component';

describe('YilBaseMasterCRUDTheOtherOneComponent', () => {
  let component: YilBaseMasterCRUDTheOtherOneComponent;
  let fixture: ComponentFixture<YilBaseMasterCRUDTheOtherOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilBaseMasterCRUDTheOtherOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilBaseMasterCRUDTheOtherOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
