import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTextComponent } from './dash-text.component';

describe('DashTextComponent', () => {
  let component: DashTextComponent;
  let fixture: ComponentFixture<DashTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
