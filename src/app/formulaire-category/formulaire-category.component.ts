import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../Classes/category';
import {COLORS} from '../const/availableColors';
import {Color} from '../Classes/color';

@Component({
  selector: 'app-formulaire-category',
  templateUrl: './formulaire-category.component.html',
  styleUrls: ['./formulaire-category.component.css']
})
export class FormulaireCategoryComponent implements OnInit {

  @Input()
  allCategories:Category[];


  visible:boolean;
  texteBouton:string = 'Nouvelle Catégorie';

  possibleColors=COLORS;

  libelle:string;
  color:Color;


  constructor() { }

  ngOnInit() {
  }

  clickButton(): void{
    if(this.visible){
      this.texteBouton="Nouvelle Catégorie";
      this.visible=false;
    }else{
      this.texteBouton="Cacher ce menu";
      this.visible=true;
    }
  }

  ajouterCategory(libelle:string,color:Color){
    this.allCategories.push(new Category(libelle,color));
    this.reinitialiser();
  }

  reinitialiser() {
    this.libelle = '';
    this.color = null;
  }


}
