import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSportDisciplineComponent } from './add-sport-discipline.component';

describe('AddSportDisciplineComponent', () => {
  let component: AddSportDisciplineComponent;
  let fixture: ComponentFixture<AddSportDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSportDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSportDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
