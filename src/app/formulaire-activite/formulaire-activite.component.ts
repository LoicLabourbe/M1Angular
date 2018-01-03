import {Component, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';
import {Color} from '../Classes/color';
import {Duree} from '../Classes/duree';

@Component({
  selector: 'app-formulaire-activite',
  templateUrl: './formulaire-activite.component.html',
  styleUrls: ['./formulaire-activite.component.css']
})
export class FormulaireActiviteComponent implements OnInit {

  allActivities:Activity[];
  allCategories:Category[];

  visible:boolean=false;

  //champ du formulaire pour la création d'une activité
  libelle:string;
  category:Category;
  actDesc:string;
  nbAct:number;


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.nbAct = parseInt(localStorage.getItem('nbAct'),10);
    this.allCategories=this.dataService.getCategories();
    this.allActivities=this.dataService.getActivities();
    if(0<this.allCategories.length){
      this.category=this.allCategories[0];
    }
  }


  ajouterActivity(libelle:string,actDesc:string,category:Category):void{
    if(libelle!=null && actDesc!=null && category!=null){
      this.nbAct++;
      localStorage.setItem('nbAct',this.nbAct.toString());
      this.dataService.addAct(new Activity(libelle,actDesc,category));
      this.ajoutLocal(libelle,actDesc,category.libelle);
      this.reinitialiser();
    }
  }

  reinitialiser():void{
    this.libelle ="";
    this.actDesc="";
  }

  ajoutLocal(nom:string, desc:string, cat:string):void{
    localStorage.setItem('nomAct'+this.nbAct.toString(),nom);
    localStorage.setItem('descAct'+this.nbAct.toString(),desc);
    localStorage.setItem('catAct'+this.nbAct.toString(),cat);
  }

}
