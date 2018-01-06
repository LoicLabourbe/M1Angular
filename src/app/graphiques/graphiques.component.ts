import { Component, OnInit } from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {

  listeDurees:number[]=[];
  allActivity:Activity[];
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  dureeTotal:number=0;
  waiter:Boolean;
  pieChartType:string = 'pie';

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

  reset():void{
    this.listeDurees=[];
  }

  selecCat(name:string):void{
    this.waiter=false;
    if(this.listeActivitees != []){
      this.reset();
    }
    for(let i = 0; i<this.allCategories.length; i++){
      if(this.allCategories[i].libelle === name){
        this.catego = this.allCategories[i];
        this.allActivity = this.dataService.getActivitiesByCategory(this.catego.id);
        if(this.allActivity.length === 0){
          alert('Aucune Activitées.');
        } else {
          for (let j =0; j < this.allActivity.length; j++) {
            this.dureeTotal=0;
            this.listeActivitees[j]=this.allActivity[j].nom;
            for(let k =0; k<this.allActivity[j].mesDurees.length; k++){
              this.dureeTotal += this.allActivity[j].mesDurees[k].secondsPassed;
            }
            this.listeDurees[j] = this.dureeTotal;
          }
        }
      }
    }
    this.waiter=true;
  }
}
