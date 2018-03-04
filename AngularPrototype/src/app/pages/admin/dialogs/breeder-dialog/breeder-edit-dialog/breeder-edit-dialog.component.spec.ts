import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederEditDialogComponent } from './breeder-edit-dialog.component';

describe('BreederEditDialogComponent', () => {
  let component: BreederEditDialogComponent;
  let fixture: ComponentFixture<BreederEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
