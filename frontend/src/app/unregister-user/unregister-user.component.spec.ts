import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterUserComponent } from './unregister-user.component';

describe('UnregisterUserComponent', () => {
  let component: UnregisterUserComponent;
  let fixture: ComponentFixture<UnregisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
