import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDeleteDialogComponent } from './club-delete-dialog.component';

describe('ClubDeleteDialogComponent', () => {
  let component: ClubDeleteDialogComponent;
  let fixture: ComponentFixture<ClubDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
