import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfineComponent } from './addfine.component';

describe('AddfineComponent', () => {
  let component: AddfineComponent;
  let fixture: ComponentFixture<AddfineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddfineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
