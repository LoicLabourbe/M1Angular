import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireActiviteComponent } from './formulaire-activite.component';

describe('FormulaireActiviteComponent', () => {
  let component: FormulaireActiviteComponent;
  let fixture: ComponentFixture<FormulaireActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
