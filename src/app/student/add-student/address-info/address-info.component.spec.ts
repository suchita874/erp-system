import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoComponent } from './address-info.component';

describe('AddressInfoComponent', () => {
  let component: AddressInfoComponent;
  let fixture: ComponentFixture<AddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
