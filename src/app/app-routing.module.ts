import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormulaireActiviteComponent} from './formulaire-activite/formulaire-activite.component';
import {FormulaireCategoryComponent} from './formulaire-category/formulaire-category.component';
import {HomeActivityComponent} from './homeActivity/homeActivity.component';
import {HomeCategoryComponent} from './homeCategory/homeCategory.component';
import {GraphiquesComponent} from './graphiques/graphiques.component';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component: HomeActivityComponent},
  {path:'formulaireCategory',component:FormulaireCategoryComponent},
  {path:'formulaireActivite',component:FormulaireActiviteComponent},
  {path:'homeActivity/:id',component:HomeActivityComponent},
  {path:'homeCategory',component:HomeCategoryComponent},
  {path:'graphiques',component:GraphiquesComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
