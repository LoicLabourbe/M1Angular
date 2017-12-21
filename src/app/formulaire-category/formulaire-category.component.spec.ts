import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCategoryComponent } from './formulaire-category.component';

describe('FormulaireCategoryComponent', () => {
  let component: FormulaireCategoryComponent;
  let fixture: ComponentFixture<FormulaireCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
