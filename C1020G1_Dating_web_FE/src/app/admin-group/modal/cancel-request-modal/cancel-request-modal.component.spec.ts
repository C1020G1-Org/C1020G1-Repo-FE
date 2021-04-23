import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRequestModalComponent } from './cancel-request-modal.component';

describe('CancelRequestModalComponent', () => {
  let component: CancelRequestModalComponent;
  let fixture: ComponentFixture<CancelRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
