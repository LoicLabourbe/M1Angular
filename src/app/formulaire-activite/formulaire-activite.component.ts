import {Component, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';
import {DataService} from '../services/data.service';

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


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
    this.allActivities=this.dataService.getActivities();
    if(0<this.allCategories.length){
      this.category=this.allCategories[0];
    }

  }


  ajouterActivity(libelle:string,actDesc:string,category:Category):void{
    this.allActivities.push(new Activity(libelle,actDesc,category));
    this.reinitialiser();
  }

  reinitialiser():void{
    this.libelle ="";
    this.category = null;
    this.actDesc="";
  }

}
