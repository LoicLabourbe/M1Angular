///<reference path="../../../node_modules/@types/jasmine/index.d.ts"/>
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DureeComponent} from './duree.component';

describe('DureeComponent', () => {
  let component: DureeComponent;
  let fixture: ComponentFixture<DureeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DureeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DureeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
