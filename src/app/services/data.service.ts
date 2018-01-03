import {Injectable} from '@angular/core';
import {Category} from '../Classes/category';
import {COLORS} from '../const/availableColors';
import {Activity} from '../Classes/activity';
import {Color} from '../Classes/color';
import {Duree} from '../Classes/duree';

@Injectable()
export class DataService{


  private allCategories:Category[]=[
    /*{libelle:"Travail",color:COLORS[0]}
    ,{libelle:"Détente",color:COLORS[1]}
    ,{libelle:"Loisirs",color:COLORS[2]}*/
  ];

  private  allActivities:Activity[]=[
    /*new Activity("Projet","Le projet d'angular",this.allCategories[0])
    ,new Activity("Repos","Se reposer après avoir bien travaillé",this.allCategories[1])*/
  ];


  getCategories():Category[]{
    this.allCategories = [];
    for (var i=1; i<=parseInt(localStorage.getItem('nbCategorie'),10);i++){
      var l = localStorage.getItem('libelleCat'+i);
      var c = localStorage.getItem('colorCat'+i);
      var h = localStorage.getItem('htmlCat'+i);
      this.addCat(new Category(l,new Color(c,h)));
    }
    return this.allCategories;
  }

  getActivities():Activity[]{
    this.allActivities =[];
    for(var i=1; i<=parseInt(localStorage.getItem('nbAct'),10);i++){
      var l = localStorage.getItem('nomAct'+i);
      var d = localStorage.getItem('descAct'+i);
      var c = localStorage.getItem('catAct'+i);
      this.addAct(new Activity(l,d,this.getCatString(c)));
    }
    this.rajoutDurees();
    return this.allActivities;
  }

 addCat(cat:Category){
    this.allCategories.push(cat);
  }

  addAct(act:Activity){
    this.allActivities.push(act);
  }

  getCatString(nom:string):Category{
    for (var i=1; i<=parseInt(localStorage.getItem('nbCategorie'),10);i++){
      var l = localStorage.getItem('libelleCat'+i);
      var c = localStorage.getItem('colorCat'+i);
      var h = localStorage.getItem('htmlCat'+i);
      if(l === nom){
        return new Category(l,new Color(c,h));
      }
    }
  }

  rajoutDurees():void{
    for (var i=1; i<=parseInt(localStorage.getItem('nbAct'),10);i++){
      var a = localStorage.getItem('nomAct'+i);
      for( var j = 1; j<=parseInt(localStorage.getItem('nbdurees'+a));j++){
        var s = localStorage.getItem('startDuree'+a+j);
        var e = localStorage.getItem('endDuree'+a+j);
        var d = localStorage.getItem('Duree'+a+j);
        var durees = new Duree();
        durees.start = new Date(parseInt(s,10));
        durees.end = new Date(parseInt(e,10));
        durees.secondsPassed = parseInt(d,10);
        this.allActivities[this.getPosAct(a)].mesDurees.push(durees);
      }
    }
  }

  getPosAct(nom:string):number{
    for(var i = 0; i<this.allActivities.length;i++){
      if(this.allActivities[i].nom === nom){
        return i;
      }
    }
  }

  getActivitiesByCategory(id:number):Activity[]{
    var tab:Activity[] = [];
    for(var i=0;i<this.getActivities().length;i++){
      if(id === this.getActivities()[i].category.id){
        tab.push(this.getActivities()[i]);
      }
    }
    return tab;
  }

}
