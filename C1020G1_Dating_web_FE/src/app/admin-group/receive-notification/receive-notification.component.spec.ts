import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNotificationComponent } from './receive-notification.component';

describe('ReceiveNotificationComponent', () => {
  let component: ReceiveNotificationComponent;
  let fixture: ComponentFixture<ReceiveNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
