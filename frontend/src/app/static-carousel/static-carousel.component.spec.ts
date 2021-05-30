import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticCarouselComponent } from './static-carousel.component';

describe('PopMoviesComponent', () => {
  let component: StaticCarouselComponent;
  let fixture: ComponentFixture<StaticCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
