import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilBaseMasterListComponent } from './yil-base-master-list.component';

describe('YilBaseMasterListComponent', () => {
  let component: YilBaseMasterListComponent;
  let fixture: ComponentFixture<YilBaseMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilBaseMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilBaseMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
