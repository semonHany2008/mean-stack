import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sub2Component } from './sub-2.component';

describe('Sub2Component', () => {
  let component: Sub2Component;
  let fixture: ComponentFixture<Sub2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sub2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sub2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
