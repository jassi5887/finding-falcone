import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetFlightComponent } from './planet-flight.component';

describe('PlanetFlightComponent', () => {
  let component: PlanetFlightComponent;
  let fixture: ComponentFixture<PlanetFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
