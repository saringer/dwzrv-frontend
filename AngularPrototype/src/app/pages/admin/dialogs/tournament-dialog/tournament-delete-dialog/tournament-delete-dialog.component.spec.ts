import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDeleteDialogComponent } from './tournament-delete-dialog.component';

describe('TournamentDeleteDialogComponent', () => {
  let component: TournamentDeleteDialogComponent;
  let fixture: ComponentFixture<TournamentDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
