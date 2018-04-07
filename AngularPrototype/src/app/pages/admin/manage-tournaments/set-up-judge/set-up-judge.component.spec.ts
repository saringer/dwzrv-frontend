import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpJudgeComponent } from './set-up-judge.component';

describe('SetUpJudgeComponent', () => {
  let component: SetUpJudgeComponent;
  let fixture: ComponentFixture<SetUpJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
