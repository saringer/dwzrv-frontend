import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCrudTableComponent } from './owner-crud-table.component';

describe('OwnerCrudTableComponent', () => {
  let component: OwnerCrudTableComponent;
  let fixture: ComponentFixture<OwnerCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
