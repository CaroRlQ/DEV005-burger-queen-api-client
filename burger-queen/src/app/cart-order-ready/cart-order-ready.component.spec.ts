import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartOrderReadyComponent } from './cart-order-ready.component';

describe('CartOrderReadyComponent', () => {
  let component: CartOrderReadyComponent;
  let fixture: ComponentFixture<CartOrderReadyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrderReadyComponent]
    });
    fixture = TestBed.createComponent(CartOrderReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
