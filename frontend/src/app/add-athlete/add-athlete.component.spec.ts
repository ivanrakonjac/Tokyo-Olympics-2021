import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAthleteComponent } from './add-athlete.component';

describe('AddAthleteComponent', () => {
  let component: AddAthleteComponent;
  let fixture: ComponentFixture<AddAthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAthleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
