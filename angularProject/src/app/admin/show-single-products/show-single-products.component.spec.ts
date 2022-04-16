import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleProductsComponent } from './show-single-products.component';

describe('ShowSingleProductsComponent', () => {
  let component: ShowSingleProductsComponent;
  let fixture: ComponentFixture<ShowSingleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
