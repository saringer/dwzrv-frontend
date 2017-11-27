import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursingComponent } from './coursing.component';

describe('CoursingComponent', () => {
  let component: CoursingComponent;
  let fixture: ComponentFixture<CoursingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
