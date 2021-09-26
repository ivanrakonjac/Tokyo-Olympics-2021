import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAthletesComponent } from './get-athletes.component';

describe('GetAthletesComponent', () => {
  let component: GetAthletesComponent;
  let fixture: ComponentFixture<GetAthletesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAthletesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
