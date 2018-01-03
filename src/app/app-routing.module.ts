import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormulaireActiviteComponent} from './formulaire-activite/formulaire-activite.component';
import {HomeComponent} from './home/home.component';
import {FormulaireCategoryComponent} from './formulaire-category/formulaire-category.component';
import {HomeActivityComponent} from './homeActivity/homeActivity.component';
import {HomeCategoryComponent} from './homeCategory/homeCategory.component';

const routes: Routes =[
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:'formulaireCategory',component:FormulaireCategoryComponent},
  {path:'formulaireActivite',component:FormulaireActiviteComponent},
  {path:'homeActivity/:id',component:HomeActivityComponent},
  {path:'homeCategory',component:HomeCategoryComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
