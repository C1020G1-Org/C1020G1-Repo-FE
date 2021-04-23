import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListRequestComponent } from './group-list-request.component';

describe('GroupListRequestComponent', () => {
  let component: GroupListRequestComponent;
  let fixture: ComponentFixture<GroupListRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
