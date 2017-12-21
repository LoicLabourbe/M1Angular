import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../Classes/category';
import {Duree} from '../Classes/duree';
import {DureeComponent} from '../duree/duree.component';
import {COLORS} from '../const/availableColors';
import {Color} from '../Classes/color';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input()
  nom:string;
  @Input()
  description:string;
  @Input()
  category:Category;
  @Input()
  duree:Duree;
  @Input()
  mesDurees:Duree[];

  @ViewChild(DureeComponent) child:DureeComponent;

  constructor() {
  }

  ngOnInit() {
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
