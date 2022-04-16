import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserBillsComponent } from './show-user-bills.component';

describe('ShowUserBillsComponent', () => {
  let component: ShowUserBillsComponent;
  let fixture: ComponentFixture<ShowUserBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
