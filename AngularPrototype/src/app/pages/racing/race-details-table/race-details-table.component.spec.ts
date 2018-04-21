import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDetailsTableComponent } from './race-details-table.component';

describe('RaceDetailsTableComponent', () => {
  let component: RaceDetailsTableComponent;
  let fixture: ComponentFixture<RaceDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
