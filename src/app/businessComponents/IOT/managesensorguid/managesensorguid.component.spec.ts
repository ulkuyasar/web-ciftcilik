import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesensorguidComponent } from './managesensorguid.component';

describe('ManagesensorguidComponent', () => {
  let component: ManagesensorguidComponent;
  let fixture: ComponentFixture<ManagesensorguidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesensorguidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesensorguidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
