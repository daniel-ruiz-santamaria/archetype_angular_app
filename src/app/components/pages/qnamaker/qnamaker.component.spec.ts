import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnamakerComponent } from './qnamaker.component';

describe('QnamakerComponent', () => {
  let component: QnamakerComponent;
  let fixture: ComponentFixture<QnamakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnamakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnamakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
