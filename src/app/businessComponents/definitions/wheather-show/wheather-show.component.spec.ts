import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatherShowComponent } from './wheather-show.component';

describe('WheatherShowComponent', () => {
  let component: WheatherShowComponent;
  let fixture: ComponentFixture<WheatherShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatherShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatherShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
