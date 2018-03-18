import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeEditComponent } from './judge-edit.component';

describe('JudgeEditComponent', () => {
  let component: JudgeEditComponent;
  let fixture: ComponentFixture<JudgeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
