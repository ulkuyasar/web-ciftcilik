import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilComboboxComponent } from './yil-combobox.component';

describe('YilComboboxComponent', () => {
  let component: YilComboboxComponent;
  let fixture: ComponentFixture<YilComboboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilComboboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
