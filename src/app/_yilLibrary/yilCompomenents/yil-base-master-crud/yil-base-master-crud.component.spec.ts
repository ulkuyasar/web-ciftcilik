import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilBaseMasterCRUDComponent } from './yil-base-master-crud.component';

describe('YilBaseMasterCRUDComponent', () => {
  let component: YilBaseMasterCRUDComponent;
  let fixture: ComponentFixture<YilBaseMasterCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilBaseMasterCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilBaseMasterCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
