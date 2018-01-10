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
  tempsEndFSup:Date[]=[];
  tempsDeb:Date;
  tempsFin:Date;
  duree:Duree;
  activity:Activity;
  allActivity2:Activity[];
  allActivity3:Activity[]=[];
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  dureeTotal:number=0;
  dureeTOTAL:number=0;
  pieChartType:string = 'pie';
  waiter:Boolean=false;
  /*pieChartOptions:any = {
    animation: false
  };*/


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
    this.waiter=false;
  }

  reset():void{
    this.tempsDeb=null;
    this.tempsFin=null;
    this.tempsFin=null;
    this.tempsEndFSup=[];
    this.tempsStartF=[];
    this.tempsStart=[];
    this.tempsEnd=[];
    this.tempsEndF=[];
    this.allActivity2=[];
    this.listeActivitees=[];
    this.listeDurees=[];
    this.dureeTotal=0;
    this.dureeTOTAL=0;
    this.percentage=[];
    this.allActivity3=[];
  }

  creatingList(name:Category):void {
    this.reset();
    setTimeout(()=> {
      this.allActivity2 = this.dataService.getActivitiesByCategory(name.id);
      let cpt = 0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        this.listeActivitees[t] = this.allActivity2[t].nom;
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsStart[cpt] = this.allActivity2[t].mesDurees[u].start;
          cpt++;
        }
      }
      for (let j = 0; j < this.allActivity2.length; j++) {
        this.dureeTotal = 0;
        this.listeActivitees[j] = this.allActivity2[j].nom;
        for (let k = 0; k < this.allActivity2[j].mesDurees.length; k++) {
          this.dureeTotal += this.allActivity2[j].mesDurees[k].secondsPassed;
        }
        this.listeDurees[j] = this.dureeTotal;
        this.dureeTOTAL += this.dureeTotal;
      }

      for (let m = 0; m < this.listeDurees.length; m++) {
        this.percentage[m] = Math.round((this.listeDurees[m] / this.dureeTOTAL) * 100 * 100) / 100;
      }
      GraphiquesComponent.trieTableau(this.tempsStart);
      GraphiquesComponent.trieTableauDoublonJ(this.tempsStart, this.tempsStartF);
    },50);
  }

  tempsDebSelected():void {
    this.tempsFin=null;
    this.tempsEndFSup=[];

    this.listeActivitees=[];
    this.listeDurees=[];
    this.dureeTotal=0;
    this.dureeTOTAL=0;
    this.allActivity3=[];
    let cpt = 0;
    for (let t = 0; t < this.allActivity2.length; t++) {
      for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
        this.tempsStart[cpt] = this.allActivity2[t].mesDurees[u].start;
        this.tempsEnd[cpt] = this.allActivity2[t].mesDurees[u].end;
        cpt++;
      }
    }
    GraphiquesComponent.trieTableau(this.tempsEnd);
    GraphiquesComponent.trieTableauDoublonJ(this.tempsEnd, this.tempsEndF);
    cpt = 0;
    for (let i = 0; i < this.tempsEndF.length; i++) {
      if (this.tempsDeb.getDay() <= this.tempsEndF[i].getDay()) {
        this.tempsEndFSup[cpt] = this.tempsEndF[i];
        cpt++;
      }
    }
  }

  tempsFinSelected():void {
    this.listeActivitees=[];
    this.listeDurees=[];
    this.dureeTotal=0;
    this.dureeTOTAL=0;
    this.percentage=[];
    this.allActivity3=[];
    setTimeout(()=> {
      for (let j = 0; j < this.allActivity2.length; j++) {
        this.dureeTotal = 0;

        for (let k = 0; k < this.allActivity2[j].mesDurees.length; k++) {
          if (this.tempsDeb.getDay() <= this.allActivity2[j].mesDurees[k].start.getDay() && this.tempsFin.getDay() >= this.allActivity2[j].mesDurees[k].end.getDay()) {
            this.dureeTotal += this.allActivity2[j].mesDurees[k].secondsPassed;

          }
        }
        if(this.dureeTotal!=0)
          this.listeActivitees[j] = this.allActivity2[j].nom;
        this.listeDurees[j] = this.dureeTotal;
        this.dureeTOTAL += this.dureeTotal;
      }

      for (let m = 0; m < this.listeDurees.length; m++) {
        this.percentage[m] = Math.round((this.listeDurees[m] / this.dureeTOTAL) * 100 * 100) / 100;
      }
    },50);
  }

  waitTempsDeb():void{
    if(this.tempsDeb != null){
      this.tempsDebSelected();
    }
  }

  waitBoth():void{
    if(this.tempsDeb != null && this.tempsFin !=null && this.catego!=null){
      this.tempsFinSelected();
    }
  }

  waitCatego():void {
    if (this.catego != null) {
      this.creatingList(this.catego);
    }
  }

  static trieTableau(Tab:Date[]):void{
    Tab.sort((date1, date2) => {
      if (date1.getFullYear() < date2.getFullYear()) {
        return -1;
      } else if (date1.getMonth() < date2.getMonth()) {
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
  }

  static trieTableauDoublonJ(Tab:Date[], Tab1:Date[]):void{
    let cpt2=0;
    Tab1[cpt2]=Tab[cpt2];
    cpt2++;
    for(let h=1;h<Tab.length;h++){
      if(Tab1[cpt2-1].getDay()!=Tab[h].getDay()) {
        Tab1[cpt2] = Tab[h];
        cpt2++;
      }
      if(Tab1[cpt2-1].getDay()==Tab[h].getDay()){
        if(Tab1[cpt2-1].getMonth()!=Tab[h].getMonth()){
          Tab1[cpt2] = Tab[h];
          cpt2++;
        }
      }
    }
  }
}
