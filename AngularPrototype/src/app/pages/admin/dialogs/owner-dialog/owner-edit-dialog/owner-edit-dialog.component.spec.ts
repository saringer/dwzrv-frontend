import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditDialogComponent } from './owner-edit-dialog.component';

describe('OwnerEditDialogComponent', () => {
  let component: OwnerEditDialogComponent;
  let fixture: ComponentFixture<OwnerEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
