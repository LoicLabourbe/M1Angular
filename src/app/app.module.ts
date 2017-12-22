import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {DureeComponent} from './duree/duree.component';
import { ActivityComponent } from './activity/activity.component';
import { MenuComponent } from './menu/menu.component';
import { FormulaireCategoryComponent } from './formulaire-category/formulaire-category.component';
import { FormulaireActiviteComponent } from './formulaire-activite/formulaire-activite.component';

@NgModule({
  declarations: [
    AppComponent,
    DureeComponent,
    ActivityComponent,
    MenuComponent,
    FormulaireCategoryComponent,
    FormulaireActiviteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
