import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederCrudTableComponent } from './breeder-crud-table.component';

describe('BreederCrudTableComponent', () => {
  let component: BreederCrudTableComponent;
  let fixture: ComponentFixture<BreederCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
