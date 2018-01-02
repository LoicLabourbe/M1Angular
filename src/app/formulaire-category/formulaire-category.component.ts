import {Component, OnInit} from '@angular/core';
import {Category} from '../Classes/category';
import {COLORS} from '../const/availableColors';
import {Color} from '../Classes/color';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-formulaire-category',
  templateUrl: './formulaire-category.component.html',
  styleUrls: ['./formulaire-category.component.css']
})
export class FormulaireCategoryComponent implements OnInit {


  allCategories:Category[];



  possibleColors=COLORS;
  libelle:string;
  color:Color;


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
    if(0<this.possibleColors.length){
      this.color=this.possibleColors[0];
    }
  }


  ajouterCategory(libelle:string,color:Color){
    this.allCategories.push(new Category(libelle,color));
    //console.log("color :"+this.color.libelle);
    this.reinitialiser();
  }

  reinitialiser() {
    this.libelle = '';
    this.color = null;
  }


}
