import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAthleteToDisciplinesComponent } from './add-athlete-to-disciplines.component';

describe('AddAthleteToDisciplinesComponent', () => {
  let component: AddAthleteToDisciplinesComponent;
  let fixture: ComponentFixture<AddAthleteToDisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAthleteToDisciplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAthleteToDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
