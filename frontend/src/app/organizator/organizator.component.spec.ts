import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorComponent } from './organizator.component';

describe('OrganizatorComponent', () => {
  let component: OrganizatorComponent;
  let fixture: ComponentFixture<OrganizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
