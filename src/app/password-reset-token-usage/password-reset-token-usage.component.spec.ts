import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetTokenUsageComponent } from '@src/app/password-reset-token-usage/password-reset-token-usage.component';

describe('PasswordResetTokenUsageComponent', () => {
  let component: PasswordResetTokenUsageComponent;
  let fixture: ComponentFixture<PasswordResetTokenUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetTokenUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetTokenUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
