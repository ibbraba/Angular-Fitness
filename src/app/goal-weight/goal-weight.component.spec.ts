import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalWeightComponent } from './goal-weight.component';

describe('GoalWeightComponent', () => {
  let component: GoalWeightComponent;
  let fixture: ComponentFixture<GoalWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalWeightComponent]
    });
    fixture = TestBed.createComponent(GoalWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
