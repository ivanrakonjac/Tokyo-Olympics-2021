import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAthleteToTeamComponent } from './add-athlete-to-team.component';

describe('AddAthleteToTeamComponent', () => {
  let component: AddAthleteToTeamComponent;
  let fixture: ComponentFixture<AddAthleteToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAthleteToTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAthleteToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
