import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberWarningComponent } from './group-member-warning.component';

describe('GroupMemberWarningComponent', () => {
  let component: GroupMemberWarningComponent;
  let fixture: ComponentFixture<GroupMemberWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMemberWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
