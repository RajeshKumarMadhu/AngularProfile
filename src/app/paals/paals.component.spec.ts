import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaalsComponent } from './paals.component';

describe('PaalsComponent', () => {
  let component: PaalsComponent;
  let fixture: ComponentFixture<PaalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
