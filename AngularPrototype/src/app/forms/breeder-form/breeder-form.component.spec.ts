import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederFormComponent } from './breeder-form.component';

describe('BreederFormComponent', () => {
  let component: BreederFormComponent;
  let fixture: ComponentFixture<BreederFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
