import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeActivityComponent} from './homeActivity.component';

describe('HomeActivityComponent', () => {
  let component: HomeActivityComponent;
  let fixture: ComponentFixture<HomeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeActivityComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
