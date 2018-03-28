import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursingEvaluationComponent } from './coursing-evaluation.component';

describe('CoursingEvaluationComponent', () => {
  let component: CoursingEvaluationComponent;
  let fixture: ComponentFixture<CoursingEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursingEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursingEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
