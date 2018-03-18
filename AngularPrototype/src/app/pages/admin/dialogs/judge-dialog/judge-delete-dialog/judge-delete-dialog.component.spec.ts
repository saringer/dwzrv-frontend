import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeDeleteDialogComponent } from './judge-delete-dialog.component';

describe('JudgeDeleteDialogComponent', () => {
  let component: JudgeDeleteDialogComponent;
  let fixture: ComponentFixture<JudgeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
