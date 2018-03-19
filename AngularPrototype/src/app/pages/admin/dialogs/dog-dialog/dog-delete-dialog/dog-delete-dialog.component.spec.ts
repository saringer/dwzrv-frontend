import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDeleteDialogComponent } from './dog-delete-dialog.component';

describe('DogDeleteDialogComponent', () => {
  let component: DogDeleteDialogComponent;
  let fixture: ComponentFixture<DogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
