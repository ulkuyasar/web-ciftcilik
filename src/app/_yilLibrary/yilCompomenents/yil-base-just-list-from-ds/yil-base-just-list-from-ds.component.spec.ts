import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilBaseJustListFromDsComponent } from './yil-base-just-list-from-ds.component';

describe('YilBaseJustListFromDsComponent', () => {
  let component: YilBaseJustListFromDsComponent;
  let fixture: ComponentFixture<YilBaseJustListFromDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilBaseJustListFromDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilBaseJustListFromDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
