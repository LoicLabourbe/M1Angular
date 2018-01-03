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
  nbCategorie:number;


  constructor(private dataService:DataService) { }

  ngOnInit() {
    if (localStorage.getItem('nbCategorie') === null)
    {
      this.nbCategorie = 0;
      localStorage.setItem('nbCategorie','0');
    }
    else {
      this.nbCategorie = parseInt(localStorage.getItem('nbCategorie'),10);
    }
    for(var j =1; j<=parseInt(localStorage.getItem('nbCategorie'),10);j++){
      var c = localStorage.getItem('colorCat'+j);
      for(var i = 0; i<=this.possibleColors.length; i++){
        if(c === this.possibleColors[i].libelle){
          this.possibleColors.splice(i,1);
          break;
        }
      }
    }
    if(0<this.possibleColors.length){
      this.color=this.possibleColors[0];
    }
  }


  ajouterCategory(libelle:string,color:Color):void{
    if(libelle!=null){
      this.nbCategorie++;
      localStorage.setItem('nbCategorie',this.nbCategorie.toString());
      this.dataService.addCat(new Category(libelle,color,this.dataService.getCategories().length));
      this.ajoutLocal(libelle,color);
      for(var i = 0; i<=this.possibleColors.length; i++){
        if(color === this.possibleColors[i]){
          this.possibleColors.splice(i,1);
          break;
        }
      }
      this.allCategories.push(new Category(libelle,color,this.dataService.getCategories().length));
      this.reinitialiser();
    }
  }

  reinitialiser():void {
    this.libelle = '';
    this.color = null;
  }

  ajoutLocal(libelle:string,color:Color):void {
    localStorage.setItem('libelleCat'+this.nbCategorie.toString(),libelle);
    localStorage.setItem('colorCat'+this.nbCategorie.toString(),color.libelle);
    localStorage.setItem('htmlCat'+this.nbCategorie.toString(),color.htmlCode);
  }


}
