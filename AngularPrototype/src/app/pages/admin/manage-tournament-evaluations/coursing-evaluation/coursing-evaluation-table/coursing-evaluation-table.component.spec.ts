import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursingEvaluationTableComponent } from './coursing-evaluation-table.component';

describe('CoursingEvaluationTableComponent', () => {
  let component: CoursingEvaluationTableComponent;
  let fixture: ComponentFixture<CoursingEvaluationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursingEvaluationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursingEvaluationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
