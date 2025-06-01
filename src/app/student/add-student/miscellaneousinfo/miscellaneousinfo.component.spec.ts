import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousinfoComponent } from './miscellaneousinfo.component';

describe('MiscellaneousinfoComponent', () => {
  let component: MiscellaneousinfoComponent;
  let fixture: ComponentFixture<MiscellaneousinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscellaneousinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
