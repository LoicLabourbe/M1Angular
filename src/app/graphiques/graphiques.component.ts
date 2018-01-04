import { Component, OnInit } from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {Color} from '../Classes/color';
import {leave} from '@angular/core/src/profile/wtf_impl';
import {exitCodeFromResult} from '@angular/compiler-cli';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {

  listeDurees:number[]=[];
  listeCouleurs:Color[]=[];
  allActivity:Activity[];
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  name:string;
  found:Boolean;
  dureeTotal:number=0;
  pieChartType:string = 'pie';

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

  reset():void{
    this.listeCouleurs=[];
    this.listeActivitees=[];
    this.listeDurees=[];
  }

  selecCat(name:string):void{
    this.found=false;
    for(var i = 0; i<this.allCategories.length;i++){
      if(this.allCategories[i].libelle === name){
        this.found=true;
        this.catego = this.allCategories[i];
        this.allActivity = this.dataService.getActivitiesByCategory(this.catego.id);
        if(this.allActivity.length === 0){
          alert('Aucune Activitées.');
        } else {
          for (var j =0; j < this.allActivity.length; j++) {
            this.dureeTotal=0;
            this.listeActivitees[j]=this.allActivity[j].nom;
            this.listeCouleurs[j]=this.allActivity[j].category.color;
            for(var k =0;k<this.allActivity[j].mesDurees.length;k++){
              this.dureeTotal += this.allActivity[j].mesDurees[k].secondsPassed;
            }
            this.listeDurees[j] = this.dureeTotal;
          }
        }
      }
    }
    if(this.found === false){
      alert('Categorie inconnue.');
    }
  }
}
