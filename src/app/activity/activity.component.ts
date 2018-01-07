import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../Classes/category';
import {Duree} from '../Classes/duree';
import {DureeComponent} from '../duree/duree.component';
import {Activity} from '../Classes/activity';
import {start} from "repl";
import { Angular2Txt } from 'angular2-txt/Angular2-txt';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input()
  myActivity:Activity;


  nom:string;
  description:string;
  category:Category;
  duree:Duree;
  mesDurees:Duree[];
  nbdurees:number;
  lance:boolean;

  @ViewChild(DureeComponent) child:DureeComponent;

  constructor() {
  }

  ngOnInit() {
    this.nom=this.myActivity.nom;
    this.description=this.myActivity.description;
    this.category=this.myActivity.category;
    this.duree=this.myActivity.duree;
    this.mesDurees=this.myActivity.mesDurees;
    this.lance=false;
    if (localStorage.getItem('nbdurees'+this.nom) === null)
    {
      this.nbdurees = 0;
      localStorage.setItem('nbdurees'+this.nom,'0');
    }
    else {
      this.nbdurees = parseInt(localStorage.getItem('nbdurees'+this.nom),10);
    }
  }


  private start():void {
    this.duree = new Duree();
    this.child.duree=this.duree;
    this.child.startTimer();
    this.lance=true;
  }

  private stop():void {
    this.child.stopTimer();
    this.mesDurees.push(this.duree);
    this.nbdurees++;
    localStorage.setItem('nbdurees' + this.nom, this.nbdurees.toString());
    localStorage.setItem('startDuree' + this.nom + this.nbdurees, this.duree.start.getTime().toString());
    localStorage.setItem('endDuree' + this.nom + this.nbdurees, this.duree.end.getTime().toString());
    localStorage.setItem('Duree' + this.nom + this.nbdurees, this.duree.secondsPassed.toString());
    this.lance=false;
  }

  public clickActivity():void{
    if(this.lance)
      this.stop();
    else
      this.start();
  }

  public export():void{
    let durees:string = "";
    durees += "Durées de l'activité : \r\n";
    for(var i=0;i<this.mesDurees.length;i++){
      durees += "durée de la portion : "+this.mesDurees[i].secondsPassed+" \r\n";
      durees += "Début : "+this.mesDurees[i].start.toDateString();
      durees += " \r\n";
      durees += "Fin : "+this.mesDurees[i].end.toDateString();
      durees += " \r\n";
      durees += "\r\n";
    }
    let data = [
      {
        nom:"Nom de l'activité : "+this.nom + " \r\n",
        categorie:"Nom de la catégorie : "+this.category.libelle + " \r\n",
        description:"Description : "+this.description + " \r\n",
        duree:durees,
      }
    ];
    new Angular2Txt(data, this.nom);
  }

}
