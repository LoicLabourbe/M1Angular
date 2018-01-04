import { Component, OnInit } from '@angular/core';
import {Duree} from '../Classes/duree';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {

  listeDurees:number[];
  allActivity:Activity[];
  allCategories:Category[];
  catego:Category;
  id:number;
  name:string;
  found:Boolean;
  dureeTotal:number=0;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

  selecCat(name:string):void{
    this.found=false;
    for(var i = 0; i<this.allCategories.length;i++){
      if(this.allCategories[i].libelle === name){
        this.found=true;
        this.catego = this.allCategories[i];
        this.allActivity = this.dataService.getActivitiesByCategory(this.catego.id);
        if(this.allActivity.length === 0){
          alert("Aucune Activitées.");
        } else {
          for (var j =0; j < this.allActivity.length; j++) {
            this.dureeTotal=0;
            for(var k =0;k<this.allActivity[j].mesDurees.length;k++){
              this.dureeTotal += Number(this.allActivity[j].mesDurees[k]);
            }
            this.listeDurees[j] = this.dureeTotal;
          }
        }
      }
    }
    if(this.found === false){
      alert("Categorie inconnue.");
    }
  }

}
