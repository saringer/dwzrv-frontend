import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEvaluationComponent } from './race-evaluation.component';

describe('RaceEvaluationComponent', () => {
  let component: RaceEvaluationComponent;
  let fixture: ComponentFixture<RaceEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
