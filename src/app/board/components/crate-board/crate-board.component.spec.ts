import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateBoardComponent } from './crate-board.component';

describe('CrateBoardComponent', () => {
  let component: CrateBoardComponent;
  let fixture: ComponentFixture<CrateBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateBoardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
