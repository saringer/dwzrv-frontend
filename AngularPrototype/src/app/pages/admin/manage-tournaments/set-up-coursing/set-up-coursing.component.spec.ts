import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpCoursingComponent } from './set-up-coursing.component';

describe('SetUpCoursingComponent', () => {
  let component: SetUpCoursingComponent;
  let fixture: ComponentFixture<SetUpCoursingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpCoursingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpCoursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
