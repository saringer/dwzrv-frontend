import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursingDetailsTableComponent } from './coursing-details-table.component';

describe('CoursingDetailsTableComponent', () => {
  let component: CoursingDetailsTableComponent;
  let fixture: ComponentFixture<CoursingDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursingDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursingDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
