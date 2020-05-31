import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilComboboxViaDatasourceComponent } from './yil-combobox-via-datasource.component';

describe('YilComboboxViaDatasourceComponent', () => {
  let component: YilComboboxViaDatasourceComponent;
  let fixture: ComponentFixture<YilComboboxViaDatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilComboboxViaDatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilComboboxViaDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
