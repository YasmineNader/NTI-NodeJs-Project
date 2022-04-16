import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserCartComponent } from './single-user-cart.component';

describe('SingleUserCartComponent', () => {
  let component: SingleUserCartComponent;
  let fixture: ComponentFixture<SingleUserCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
