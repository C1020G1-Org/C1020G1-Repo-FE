import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSuggestComponent } from './friend-suggest.component';

describe('FriendSuggestComponent', () => {
  let component: FriendSuggestComponent;
  let fixture: ComponentFixture<FriendSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
