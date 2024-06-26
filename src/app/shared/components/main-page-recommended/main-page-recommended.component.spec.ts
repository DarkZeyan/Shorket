import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPageRecommendedComponent } from './main-page-recommended.component';

describe('MainPageRecommendedComponent', () => {
  let component: MainPageRecommendedComponent;
  let fixture: ComponentFixture<MainPageRecommendedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageRecommendedComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
