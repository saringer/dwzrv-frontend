import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCrudTableComponent } from './tournament-crud-table.component';

describe('TournamentCrudTableComponent', () => {
  let component: TournamentCrudTableComponent;
  let fixture: ComponentFixture<TournamentCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
