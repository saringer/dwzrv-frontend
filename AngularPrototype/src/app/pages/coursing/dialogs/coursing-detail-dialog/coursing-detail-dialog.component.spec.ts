import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursingDetailDialogComponent } from './coursing-detail-dialog.component';

describe('CoursingDetailDialogComponent', () => {
  let component: CoursingDetailDialogComponent;
  let fixture: ComponentFixture<CoursingDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursingDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
