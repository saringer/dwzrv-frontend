import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpRaceComponent } from './set-up-race.component';

describe('SetUpRaceComponent', () => {
  let component: SetUpRaceComponent;
  let fixture: ComponentFixture<SetUpRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
