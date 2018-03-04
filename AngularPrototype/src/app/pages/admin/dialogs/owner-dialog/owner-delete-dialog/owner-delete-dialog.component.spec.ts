import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDeleteDialogComponent } from './owner-delete-dialog.component';

describe('OwnerDeleteDialogComponent', () => {
  let component: OwnerDeleteDialogComponent;
  let fixture: ComponentFixture<OwnerDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
