import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisComponent } from './luis.component';

describe('LuisComponent', () => {
  let component: LuisComponent;
  let fixture: ComponentFixture<LuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
