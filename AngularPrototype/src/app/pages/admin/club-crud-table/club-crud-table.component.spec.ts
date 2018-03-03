import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCrudTableComponent } from './club-crud-table.component';

describe('ClubCrudTableComponent', () => {
  let component: ClubCrudTableComponent;
  let fixture: ComponentFixture<ClubCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
