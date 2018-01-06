import { Component, OnInit } from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {Duree} from '../Classes/duree';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {

  listeDurees:number[]=[];
  percentage:number[]=[];
  tempsStart:Date[]=[];
  temps:Date;
  duree:Duree;
  activity:Activity;
  allActivity:Activity[];
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  dureeTotal:number=0;
  dureeTOTAL:number=0;
  waiter:Boolean;
  pieChartType:string = 'pie';
  pieChartOptions:any = {
    animation: false
  };

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

  reset():void{
    this.listeDurees=[];
    this.dureeTOTAL=0;
    this.percentage=[];
    this.listeActivitees=[];
    this.catego=null;
    this.allActivity=[];
    this.waiter=false;
    this.tempsStart=[];
  }

  getDurees(name:Category):void{
    if(this.tempsStart!=[]){
      this.tempsStart=[];
    }
    this.allActivity = this.dataService.getActivitiesByCategory(name.id);
    for(let t=0;t<this.allActivity.length;t++){
        this.tempsStart[t] = this.allActivity[t].duree.start;
    }
  }


  selecCat(name:string):void{
    this.waiter=false;
    setTimeout(()=>{this.reset();
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
              this.dureeTOTAL+=this.dureeTotal;
            }
          }
        }
      }
      this.waiter=true;
      //--- Affichage des pourcentages---//
      for(let m=0;m<this.listeDurees.length;m++){
        this.percentage[m]=Math.round((this.listeDurees[m]/this.dureeTOTAL)*100);
      }
    }, 0.001);
  }
}
