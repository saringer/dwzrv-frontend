import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCrudTableComponent } from './dog-crud-table.component';

describe('DogCrudTableComponent', () => {
  let component: DogCrudTableComponent;
  let fixture: ComponentFixture<DogCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
