import {Injectable} from '@angular/core';
import {Category} from '../Classes/category';
import {COLORS} from '../const/availableColors';
import {Activity} from '../Classes/activity';

@Injectable()
export class DataService{


  private allCategories:Category[]=[
    {libelle:"Travail",color:COLORS[0],id:0}
    ,{libelle:"Détente",color:COLORS[1],id:1}
    ,{libelle:"Loisirs",color:COLORS[2],id:2}
  ];

  private  allActivities:Activity[]=[
    new Activity("Projet","Le projet d'angular",this.allCategories[0])
    ,new Activity("Repos","Se reposer après avoir bien travaillé",this.allCategories[1])
    ,new Activity("Jeux vidéos","Après l'effort, le réconfort",this.allCategories[2])
  ];


  getCategories():Category[]{
    return this.allCategories;
  }

  getActivities():Activity[]{
    return this.allActivities;
  }

  getActivitiesByCategory(id:number):Activity[]{
    var tab:Activity[] = [];
    for(var i = 0;i<this.allActivities.length;i++) {
      if(this.allActivities[i].category.id==id){
        tab.push(this.allActivities[i]);
      }
    }
    return tab;
  }
}
