import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAdministrationComponent } from './tournament-administration.component';

describe('TournamentAdministrationComponent', () => {
  let component: TournamentAdministrationComponent;
  let fixture: ComponentFixture<TournamentAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
