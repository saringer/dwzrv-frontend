import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEditDialogComponent } from './club-edit-dialog.component';

describe('ClubEditDialogComponent', () => {
  let component: ClubEditDialogComponent;
  let fixture: ComponentFixture<ClubEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
