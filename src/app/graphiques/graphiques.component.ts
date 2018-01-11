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
  listeActivitees:string[]=[];
  allCategories:Category[];
  catego:Category;
  dureeTotal:number=0;
  dureeTOTAL:number=0;
  pieChartType:string = 'pie';
  bothTimes:string[]=[];

  dureeTotalCat:number;
  percentageCat:number[]=[];
  dureeTOTALCat:number;
  nameCategorie:string[]=[];
  listeDureesCat:number[]=[];
  allActivityByCat:Activity[][]=[];
  listeColor:string[]=[];
  pieChartColors:any[]=[];


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
    this.creatingGraphCat();
  }

  reset():void{
    //--- TOUTES les valeurs reinitialisées ---//
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
    this.bothTimes=[];
  }

  creatingList(name:Category):void {
    this.reset();
    setTimeout(()=> {

      //--- Creation des temps de démarrage des activitées ---//
      this.allActivity2 = this.dataService.getActivitiesByCategory(name.id);
      let cpt = 0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        this.listeActivitees[t] = this.allActivity2[t].nom;
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsStart[cpt] = this.allActivity2[t].mesDurees[u].start;
          cpt++;
        }
      }
      GraphiquesComponent.trieTableau(this.tempsStart);
      GraphiquesComponent.trieTableauDoublonJ(this.tempsStart, this.tempsStartF);
    },50);
  }

  tempsDebSelected():void {

    //--- valeurs spécifiques à réinitialisés pour la mise a jour du graphe et des listes ---//
    this.tempsFin=null;
    this.tempsEndFSup=[];
    this.listeActivitees=[];
    this.listeDurees=[];
    this.bothTimes=[];
    this.dureeTotal=0;
    this.dureeTOTAL=0;

    setTimeout(()=>{
      //--- création de la liste des temps de départ selon la date de debut selectionné ---//
      let cpt = 0;
      for (let t = 0; t < this.allActivity2.length; t++) {
        for (let u = 0; u < this.allActivity2[t].mesDurees.length; u++) {
          this.tempsEnd[cpt] = this.allActivity2[t].mesDurees[u].end;
          cpt++;
        }
      }
      GraphiquesComponent.trieTableau(this.tempsEnd);
      GraphiquesComponent.trieTableauDoublonJ(this.tempsEnd, this.tempsEndF);
      cpt = 0;

      //--- Selectionne les dates de fin postérieurs à la date de début ---//
      for (let i = 0; i < this.tempsEndF.length; i++) {
        if (this.tempsDeb.getDay() <= this.tempsEndF[i].getDay()) {
          this.tempsEndFSup[cpt] = this.tempsEndF[i];
          cpt++;
        }
      }
    },50)

  }

  tempsFinSelected():void {

    //--- valeur spécifique à reinitialisées pour la MAJ du graphe et des listes ---//
    this.listeActivitees=[];
    this.listeDurees=[];
    this.dureeTotal=0;
    this.dureeTOTAL=0;
    this.percentage=[];
    this.bothTimes=[];
    setTimeout(()=> {

      //--- calcule des durées en fonction de la date de début et de fin selectionnées ---//
      let cpt3=0;
      let cpt4=0;
      for (let j = 0; j < this.allActivity2.length; j++) {
        this.dureeTotal = 0;
        for (let k = 0; k < this.allActivity2[j].mesDurees.length; k++) {
          if (this.tempsDeb.getDay() <= this.allActivity2[j].mesDurees[k].start.getDay() && this.tempsFin.getDay() >= this.allActivity2[j].mesDurees[k].end.getDay()) {
            this.dureeTotal += this.allActivity2[j].mesDurees[k].secondsPassed;
            this.bothTimes[cpt3] = "["+this.allActivity2[j].nom+"] "+this.allActivity2[j].mesDurees[k].start.toLocaleDateString()+" "+this.allActivity2[j].mesDurees[k].start.toLocaleTimeString()+"  -  "+this.allActivity2[j].mesDurees[k].end.toLocaleDateString()+" "+this.allActivity2[j].mesDurees[k].end.toLocaleTimeString();
            cpt3++;
          }
        }
        if(this.dureeTotal!=0) {
          this.listeActivitees[cpt4] = this.allActivity2[j].nom;
          cpt4++;
        }
        this.listeDurees[j] = this.dureeTotal;
        this.dureeTOTAL += this.dureeTotal;
      }

      for (let m = 0; m < this.listeDurees.length; m++) {
        this.percentage[m] = Math.round((this.listeDurees[m] / this.dureeTOTAL) * 100 * 100) / 100;
      }
    },50);
  }

  waiter:Boolean=false;
  WAITcreatingGraphCat():void{
    if(this.waiter===false){
      this.waiter=true;
    }else{
      this.creatingGraphCat();
      this.waiter=false;
    }
  }

  creatingGraphCat():void{
    this.dureeTOTALCat=0;
    this.percentageCat=[];
    this.nameCategorie=[];
    this.allActivityByCat=[];
    this.listeDureesCat=[];
    this.allCategories=[];
    this.listeColor=[];
    setTimeout(()=>{
      this.allCategories=this.dataService.getCategories();
      for(let a=0;a<this.allCategories.length;a++) {
        this.listeColor[a]=this.allCategories[a].color.htmlCode.toLowerCase();
        this.dureeTotalCat = 0;
        this.allActivityByCat[a] = this.dataService.getActivitiesByCategory(a + 1);
        for (let c = 0; c < this.allActivityByCat[a].length;c++){
          for (let b = 0; b < this.allActivityByCat[a][c].mesDurees.length; b++) {
            this.dureeTotalCat += this.allActivityByCat[a][c].mesDurees[b].secondsPassed;
          }
        }
        if(this.dureeTotalCat!=0)
          this.nameCategorie[a]=this.allCategories[a].libelle;
        this.listeDureesCat[a] = this.dureeTotalCat;
        this.dureeTOTALCat += this.dureeTotalCat;
      }
      for (let m = 0; m < this.listeDureesCat.length; m++) {
        this.percentageCat[m] = Math.round((this.listeDureesCat[m] / this.dureeTOTALCat) * 100 * 100) / 100;
      }
      this.pieChartColors = [{
        backgroundColor: this.listeColor
      }];
    },50);
  }

  //--- fonctions pour temporiser, afin que les valeurs nécessaires pour le graphe soit présentes ---//
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

  //--- trie un tableau de date selon l'année, puis le mois et enfin le jour ---//
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

  //--- supprime les dates doublons dans un tableau TRIE ! ---//
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
        } else if(Tab1[cpt2-1].getMonth()==Tab[h].getMonth()) {
          if(Tab1[cpt2-1].getFullYear()!=Tab[h].getFullYear()){
            Tab1[cpt2] = Tab[h];
            cpt2++;
          }
        }
      }
    }
  }
}
