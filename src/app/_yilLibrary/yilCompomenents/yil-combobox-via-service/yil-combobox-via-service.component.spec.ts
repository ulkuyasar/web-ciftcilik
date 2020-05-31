import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilComboboxViaServiceComponent } from './yil-combobox-via-service.component';

describe('YilComboboxViaServiceComponent', () => {
  let component: YilComboboxViaServiceComponent;
  let fixture: ComponentFixture<YilComboboxViaServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilComboboxViaServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilComboboxViaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
