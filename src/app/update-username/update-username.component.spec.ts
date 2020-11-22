import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsernameComponent } from '@src/app/update-username/update-username.component';

describe('UpdateUsernameComponent', () => {
  let component: UpdateUsernameComponent;
  let fixture: ComponentFixture<UpdateUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
