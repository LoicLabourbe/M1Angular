import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormulaireActiviteComponent} from './formulaire-activite/formulaire-activite.component';
import {HomeComponent} from './home/home.component';
import {FormulaireCategoryComponent} from './formulaire-category/formulaire-category.component';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:'formulaireCategory',component:FormulaireCategoryComponent},
  {path:'formulaireActivite',component:FormulaireActiviteComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
