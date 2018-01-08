import { Component, OnInit } from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {Duree} from '../Classes/duree';

@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css'],
})
export class GraphiquesComponent implements OnInit {

  listeDurees:number[]=[];
  percentage:number[]=[];
  tempsStart:Date[]=[];
  tempsEnd:Date[]=[];
  tempsStartF:Date[]=[];
  tempsEndF:Date[]=[];
  tempsDeb:Date;
  tempsFin:Date;
  duree:Duree;
  activity:Activity;
  allActivity:Activity[];
  allActivity2:Activity[];
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
    this.tempsEnd=[];
    this.tempsStartF=[];
    this.tempsEndF=[];
    this.tempsDeb=null;
    this.tempsFin=null;
  }

  getDurees(name:Category):void {
    setTimeout(() => {
      if (this.tempsStart != [] || this.tempsEnd !=[]) {
        this.tempsStart = [];
        this.tempsEnd = [];
        this.tempsDeb=null;
        this.tempsFin=null;
      }
      this.allActivity2 = this.dataService.getActivitiesByCategory(name.id);

      //--- Recupération de toutes les Dates de toutes les activitées d'un catégories ---//
      let cpt = 0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsStart[cpt] = this.allActivity2[t].mesDurees[u].start;
          cpt++;
        }
      }

      //--- Trie des tableaux de Dates ---//
      this.tempsStart.sort((date1, date2) => {
        if (date1.getMonth() < date2.getMonth()) {
          return -1;
        } else if (date1.getMonth() === date2.getMonth()) {
          if (date1.getDay() < date2.getDay()) {
            return -1;
          } else if(date1.getDay()===date2.getDay()){
            if(date1.getHours()<date2.getHours()){
              return -1;
            }
          }
        }
        return 1;
      });


      //--- Selection de seulement des jours/mois  heures ---//
      let cpt2=0;
      this.tempsStartF[cpt2]=this.tempsStart[cpt2];
      cpt2++;
      for(let h=1;h<this.tempsStart.length;h++){
        if(this.tempsStartF[cpt2-1].getHours()!=this.tempsStart[h].getHours()) {
          this.tempsStartF[cpt2] = this.tempsStart[h];
          cpt2++;
        }
      }
    }, 7);
  }


  selecCat(name:string,dateStart:Date,dateEnd:Date):void{
    this.waiter=false;
    setTimeout(()=>{this.reset();
    for (let i = 0; i < this.allCategories.length; i++) {
      if (this.allCategories[i].libelle === name) {
        this.catego = this.allCategories[i];
        this.allActivity = this.dataService.getActivitiesByCategory(this.catego.id);

        for (let j = 0; j < this.allActivity.length; j++) {
          this.dureeTotal = 0;
          this.listeActivitees[j] = this.allActivity[j].nom;
          for (let k = 0; k < this.allActivity[j].mesDurees.length; k++) {
           // if(dateStart.getDay() <= this.allActivity[j].mesDurees[k].start.getDay() && dateEnd.getDay() >= this.allActivity[j].mesDurees[k].end.getDay()) {
              this.dureeTotal += this.allActivity[j].mesDurees[k].secondsPassed;
            //}
          }
          this.listeDurees[j] = this.dureeTotal;
          this.dureeTOTAL += this.dureeTotal;
        }
        break;
      }
    }
    this.waiter=true;
    //--- Affichage des pourcentages---//
    for(let m=0;m<this.listeDurees.length;m++){
      this.percentage[m]=Math.round((this.listeDurees[m]/this.dureeTOTAL)*100*100)/100;
    }
    }, 5);
  }

  tempsDebSelected(date:Date):void{
    if(this.tempsEndF != []) {
      this.tempsEndF = [];
      this.tempsFin=null;
    }
    //setTimeout(()=>{
      let cpt=0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsEnd[cpt] = this.allActivity2[t].mesDurees[u].end;
          cpt++;
        }
      }

      this.tempsEnd.sort((date1, date2) => {
        if (date1.getMonth() < date2.getMonth()) {
          return -1;
        } else if (date1.getMonth() === date2.getMonth()) {
          if (date1.getDay() < date2.getDay()) {
            return -1;
          } else if(date1.getDay()===date2.getDay()){
            if(date1.getHours()<date2.getHours()){
              return -1;
            }
          }
        }
        return 1;
      });

      let cpt2=1;
      this.tempsEndF[0]=this.tempsEnd[0];
      for(let h=1;h<this.tempsEnd.length;h++){
        if(this.tempsEndF[cpt2-1].getHours()!=this.tempsEnd[h].getHours()) {
          this.tempsEndF[cpt2] = this.tempsEnd[h];
          cpt2++;
        }
      }
      /*cpt=0;
      for(let i=0;i<this.tempsEnd.length;i++){
        if(date.getDay()==this.tempsEndF[i].getDay()){
          for(let j=i;j<this.tempsEndF.length;j++) {
            this.tempsEndF[cpt] = this.tempsEndF[j];
            cpt++;
          }
        }
        break;
      }*/
    //},3)
  }

  tempsFinSelected():void{
    setTimeout(()=>{},3);
  }
}
