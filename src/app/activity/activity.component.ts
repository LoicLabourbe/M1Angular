import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../Classes/category';
import {Duree} from '../Classes/duree';
import {DureeComponent} from '../duree/duree.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  nom:string;
  description:string;
  category:Category;
  duree:Duree;
  mesDurees:Duree[];

  @ViewChild(DureeComponent) child:DureeComponent;

  constructor() { }

  ngOnInit() {
      this.nom = "Projet";
      this.description="Le projet d'angular.";
      this.category={libelle:"Travail"};
      this.duree =  new Duree();
      this.mesDurees=[];
  }


  public start():void{
    console.log(this.child);
    this.child.startTimer();
  }
  public stop():void{
    this.child.stopTimer();
    this.mesDurees.push(this.duree);
    this.duree=new Duree();
  }


}
