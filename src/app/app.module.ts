import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {DureeComponent} from './duree/duree.component';
import {ActivityComponent} from './activity/activity.component';
import {FormulaireCategoryComponent} from './formulaire-category/formulaire-category.component';
import {FormulaireActiviteComponent} from './formulaire-activite/formulaire-activite.component';
import {HomeComponent} from './home/home.component';
import {DataService} from './services/data.service';
import {AppRoutingModule} from './app-routing.module';
import {CategoryComponent} from './category/category.component';
import {HomeActivityComponent} from './homeActivity/homeActivity.component';
import {HomeCategoryComponent} from './homeCategory/homeCategory.component';
import { GraphiquesComponent } from './graphiques/graphiques.component';
import {SecondPassedPipe} from "./pipe/secondPassed.pipe";
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    DureeComponent,
    ActivityComponent,
    FormulaireCategoryComponent,
    FormulaireActiviteComponent,
    HomeComponent,
    CategoryComponent,
    HomeActivityComponent,
    HomeCategoryComponent,
    GraphiquesComponent,
    SecondPassedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
