import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDetailDialogComponent } from './race-detail-dialog.component';

describe('RaceDetailDialogComponent', () => {
  let component: RaceDetailDialogComponent;
  let fixture: ComponentFixture<RaceDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
