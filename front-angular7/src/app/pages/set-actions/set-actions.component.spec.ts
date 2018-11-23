import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActionsComponent } from './set-actions.component';

describe('SetActionsComponent', () => {
  let component: SetActionsComponent;
  let fixture: ComponentFixture<SetActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
