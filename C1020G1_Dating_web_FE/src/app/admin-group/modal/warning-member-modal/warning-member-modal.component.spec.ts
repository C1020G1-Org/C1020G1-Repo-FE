import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMemberModalComponent } from './warning-member-modal.component';

describe('WarningMemberModalComponent', () => {
  let component: WarningMemberModalComponent;
  let fixture: ComponentFixture<WarningMemberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningMemberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
