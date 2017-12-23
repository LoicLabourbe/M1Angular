import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { DureeComponent} from './duree/duree.component';
import { ActivityComponent } from './activity/activity.component';
import { FormulaireCategoryComponent } from './formulaire-category/formulaire-category.component';
import { FormulaireActiviteComponent } from './formulaire-activite/formulaire-activite.component';
import { HomeComponent } from './home/home.component';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    DureeComponent,
    ActivityComponent,
    FormulaireCategoryComponent,
    FormulaireActiviteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },

      {path:'home',component: HomeComponent},
      {path:'formulaireCategory',component:FormulaireCategoryComponent},
      {path:'formulaireActivite',component:FormulaireActiviteComponent}
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
