import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCrudTableComponent } from './judge-crud-table.component';

describe('JudgeCrudTableComponent', () => {
  let component: JudgeCrudTableComponent;
  let fixture: ComponentFixture<JudgeCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
