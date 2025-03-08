import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftRevealComponent } from './gift-reveal.component';

describe('GiftRevealComponent', () => {
  let component: GiftRevealComponent;
  let fixture: ComponentFixture<GiftRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftRevealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
