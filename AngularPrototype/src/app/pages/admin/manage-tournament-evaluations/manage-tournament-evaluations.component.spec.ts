import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournamentEvaluationsComponent } from './manage-tournament-evaluations.component';

describe('ManageTournamentEvaluationsComponent', () => {
  let component: ManageTournamentEvaluationsComponent;
  let fixture: ComponentFixture<ManageTournamentEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTournamentEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTournamentEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
