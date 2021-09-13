import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosRezultataComponent } from './unos-rezultata.component';

describe('UnosRezultataComponent', () => {
  let component: UnosRezultataComponent;
  let fixture: ComponentFixture<UnosRezultataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosRezultataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosRezultataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
