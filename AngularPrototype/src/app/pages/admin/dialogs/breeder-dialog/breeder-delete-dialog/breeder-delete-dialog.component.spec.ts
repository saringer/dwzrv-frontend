import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederDeleteDialogComponent } from './breeder-delete-dialog.component';

describe('BreederDeleteDialogComponent', () => {
  let component: BreederDeleteDialogComponent;
  let fixture: ComponentFixture<BreederDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
