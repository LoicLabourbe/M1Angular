import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../Classes/category';
import {Duree} from '../Classes/duree';
import {DureeComponent} from '../duree/duree.component';
import {Activity} from '../Classes/activity';


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

  @ViewChild(DureeComponent) child:DureeComponent;

  constructor() {
  }

  ngOnInit() {
    this.nom=this.myActivity.nom;
    this.description=this.myActivity.description;
    this.category=this.myActivity.category;
    this.duree=this.myActivity.duree;
    this.mesDurees=this.myActivity.mesDurees;
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
