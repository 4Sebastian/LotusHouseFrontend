import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPickComponent } from '@src/app/shelter-pick/shelter-pick.component';

describe('ShelterPickComponent', () => {
  let component: ShelterPickComponent;
  let fixture: ComponentFixture<ShelterPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
