import {Injectable} from '@angular/core';
import {Category} from '../Classes/category';
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
    return this.allCategories;
  }

  getActivities():Activity[]{
    return this.allActivities;
  }

 addCat(cat:Category){
    this.allCategories.push(cat);
  }

  addAct(act:Activity){
    this.allActivities.push(act);
  }

  private getCatString(nom:string):Category{
    for(let i = 0; i<this.allCategories.length; i++){
      if(this.allCategories[i].libelle === nom){
        return this.allCategories[i];
      }
    }
  }

  private rajoutDurees():void{
    for (let i=1; i<=parseInt(localStorage.getItem('nbAct'),10); i++){
      const a = localStorage.getItem('nomAct' + i);
      for(let j = 1; j<=parseInt(localStorage.getItem('nbdurees'+a)); j++){
        const s = localStorage.getItem('startDuree' + a + j);
        const e = localStorage.getItem('endDuree' + a + j);
        const d = localStorage.getItem('Duree' + a + j);
        const durees = new Duree();
        durees.start = new Date(parseInt(s,10));
        durees.end = new Date(parseInt(e,10));
        durees.secondsPassed = parseInt(d,10);
        this.allActivities[this.getPosAct(a)].mesDurees.push(durees);
      }
    }
  }

  private getPosAct(nom:string):number{
    for(let i = 0; i<this.allActivities.length; i++){
      if(this.allActivities[i].nom === nom){
        return i;
      }
    }
  }

  getActivitiesByCategory(id:number):Activity[]{
    const tab: Activity[] = [];
    for(let i=0; i<this.getActivities().length; i++){
      if(id == this.getActivities()[i].category.id){
        tab.push(this.getActivities()[i]);
      }
    }
    return tab;
  }

  getCategoryById(id:number):Category{
    let cat: Category = null;
    for(let i=0; i<this.getCategories().length; i++){
      if(id == this.getCategories()[i].id){
        cat = this.getCategories()[i];
      }
    }
    return cat;
  }

  initialiseCategorie() {
    for (let i = 1; i <= parseInt(localStorage.getItem('nbCategorie'), 10); i++) {
      const l = localStorage.getItem('libelleCat' + i);
      const c = localStorage.getItem('colorCat' + i);
      const h = localStorage.getItem('htmlCat' + i);
      const id = localStorage.getItem('id' + i);
      this.addCat(new Category(l, new Color(c, h),parseInt(id,10)));
    }
  }

  initialiseActivite(){
    for(let i=1; i<=parseInt(localStorage.getItem('nbAct'),10); i++){
      const l = localStorage.getItem('nomAct' + i);
      const d = localStorage.getItem('descAct' + i);
      const c = localStorage.getItem('catAct' + i);
      this.addAct(new Activity(l,d,this.getCatString(c)));
    }
    this.rajoutDurees();
  }

}
