import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakmicenjeRasporedComponent } from './takmicenje-raspored.component';

describe('TakmicenjeRasporedComponent', () => {
  let component: TakmicenjeRasporedComponent;
  let fixture: ComponentFixture<TakmicenjeRasporedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakmicenjeRasporedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakmicenjeRasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
