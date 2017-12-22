import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';

@Component({
  selector: 'app-formulaire-activite',
  templateUrl: './formulaire-activite.component.html',
  styleUrls: ['./formulaire-activite.component.css']
})
export class FormulaireActiviteComponent implements OnInit {

  @Input()
  allActivities:Activity[];
  @Input()
  allCategories:Category[];

  visible:boolean=false;
  texteBouton:string="Nouvelle activité";

  //champ du formulaire pour la création d'une activité
  libelle:string;
  category:Category;
  actDesc:string;


  constructor() { }

  ngOnInit() {
    if(0<this.allCategories.length){
      this.category=this.allCategories[0];
    }
  }

  clickButton(): void{
    if(this.visible){
      this.texteBouton="Nouvelle activité";
      this.visible=false;
    }else{
      this.texteBouton="Cacher ce menu";
      this.visible=true;
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
