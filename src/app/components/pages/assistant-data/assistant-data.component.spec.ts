import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantDataComponent } from './assistant-data.component';

describe('AssistantDataComponent', () => {
  let component: AssistantDataComponent;
  let fixture: ComponentFixture<AssistantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
