import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sub1Component } from './sub-1.component';

describe('Sub1Component', () => {
  let component: Sub1Component;
  let fixture: ComponentFixture<Sub1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sub1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sub1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
