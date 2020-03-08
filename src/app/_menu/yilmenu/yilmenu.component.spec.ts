import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YilmenuComponent } from './yilmenu.component';

describe('YilmenuComponent', () => {
  let component: YilmenuComponent;
  let fixture: ComponentFixture<YilmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YilmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YilmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
