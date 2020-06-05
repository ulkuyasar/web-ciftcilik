import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewimComponent } from './card-viewim.component';

describe('CardViewimComponent', () => {
  let component: CardViewimComponent;
  let fixture: ComponentFixture<CardViewimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardViewimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
