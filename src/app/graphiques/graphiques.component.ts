import { Component, OnInit } from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {Duree} from '../Classes/duree';
import {Color} from '../Classes/color';

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
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  dureeTotal:number=0;
  dureeTOTAL:number=0;
  pieChartType:string = 'pie';
  listeCouleur:Color[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

  reset():void{
    this.listeDurees=[];
    this.dureeTOTAL=0;
    this.percentage=[];
  }


  getDurees(name:Category):void {

    setTimeout(() => {
      this.allActivity2 = this.dataService.getActivitiesByCategory(name.id);
      //--- Recupération de toutes les Dates de toutes les activitées d'un catégories ---//
      let cpt = 0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        this.listeActivitees[t] = this.allActivity2[t].nom;
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsStart[cpt] = this.allActivity2[t].mesDurees[u].start;
          this.tempsEnd[cpt] = this.allActivity2[t].mesDurees[u].end;
          cpt++;
        }
      }

      //--- Trie des tableaux de Dates ---//
      this.tempsStart.sort((date1, date2) => {
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

      //--- Selection de seulement des jours unique ---//
      let cpt2=0;
      this.tempsStartF[cpt2]=this.tempsStart[cpt2];
      cpt2++;
      for(let h=1;h<this.tempsStart.length;h++){
        if(this.tempsStartF[cpt2-1].getDay()!=this.tempsStart[h].getDay()) {
          this.tempsStartF[cpt2] = this.tempsStart[h];
          cpt2++;
        }
        if(this.tempsStartF[cpt2-1].getDay()==this.tempsStart[h].getDay()){
          if(this.tempsStartF[cpt2-1].getMonth()!=this.tempsStart[h].getMonth()){
            this.tempsStartF[cpt2] = this.tempsStart[h];
            cpt2++;
          }
        }
      }
    }, 7);
  }

  selecCat():void {
    setTimeout(()=>{
      this.reset();
      for (let j = 0; j < this.allActivity2.length; j++) {
        this.dureeTotal = 0;
        for (let k = 0; k < this.allActivity2[j].mesDurees.length; k++) {
          if (this.tempsDeb.getDay() <= this.allActivity2[j].mesDurees[k].start.getDay() && this.tempsFin.getDay() >= this.allActivity2[j].mesDurees[k].end.getDay()) {
            this.dureeTotal += this.allActivity2[j].mesDurees[k].secondsPassed;
          }
        }
        this.listeDurees[j] = this.dureeTotal;
        this.dureeTOTAL += this.dureeTotal;
      }
      //--- Affichage des pourcentages---//
      for (let m = 0; m < this.listeDurees.length; m++) {
        this.percentage[m] = Math.round((this.listeDurees[m] / this.dureeTOTAL) * 100 * 100) / 100;
      }
    },5);
  }

  tempsDebSelected():void{
    //setTimeout(()=>{
      if(this.tempsEndFSup != []) {
        this.tempsEndFSup=[];
        this.tempsFin=null;
      }
      this.tempsEnd.sort((date1, date2) => {
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
      let cpt2=1;
      this.tempsEndF[0]=this.tempsEnd[0];
      for(let h=1;h<this.tempsEnd.length;h++){
        if(this.tempsEndF[cpt2-1].getDay()!=this.tempsEnd[h].getDay()) {
          this.tempsEndF[cpt2] = this.tempsEnd[h];
          cpt2++;
        }
        if(this.tempsEndF[cpt2-1].getDay()==this.tempsEnd[h].getDay()) {
          if (this.tempsEndF[cpt2 - 1].getMonth() != this.tempsEnd[h].getMonth()) {
            this.tempsEndF[cpt2] = this.tempsEnd[h];
            cpt2++;
          }
        }
      }
      let cpt=0;
      for(let i=0;i<this.tempsEndF.length;i++){
        if(this.tempsDeb.getDay()<=this.tempsEndF[i].getDay()){
            this.tempsEndFSup[cpt] = this.tempsEndF[i];
            cpt++;
        }
      }

    //},10)
  }

  waitTempsDeb():void{
    if(this.tempsDeb != null){
      this.tempsDebSelected();
    }
  }
  waitBoth():void{
    if(this.tempsDeb != null && this.tempsFin !=null && this.catego!=null){
      this.selecCat();
    }
  }
  waitCatego():void {
    this.tempsStart = [];
    this.tempsEnd = [];
    this.tempsDeb=null;
    this.tempsFin=null;
    this.tempsStartF=[];
    this.tempsEndF = [];
    this.tempsEndFSup=[];
    if (this.catego != null) {
      this.getDurees(this.catego);
    }
  }
}
