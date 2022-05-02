import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoardPageComponent } from './all-board-page.component';

describe('BoardPageComponent', () => {
  let component: AllBoardPageComponent;
  let fixture: ComponentFixture<AllBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBoardPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
