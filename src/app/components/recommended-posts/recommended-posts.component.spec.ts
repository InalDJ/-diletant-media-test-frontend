import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPostsComponent } from './recommended-posts.component';

describe('RecommendedPostsComponent', () => {
  let component: RecommendedPostsComponent;
  let fixture: ComponentFixture<RecommendedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
