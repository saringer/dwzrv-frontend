import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederDialogComponent } from './breeder-dialog.component';

describe('BreederDialogComponent', () => {
  let component: BreederDialogComponent;
  let fixture: ComponentFixture<BreederDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
