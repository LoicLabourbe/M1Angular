import { Component, OnInit } from '@angular/core';
import {Duree} from '../Classes/duree';
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-duree',
  templateUrl: './duree.component.html',
  styleUrls: ['./duree.component.css']
})
export class DureeComponent implements OnInit {

  duree: Duree = null;


  sub: Subscription;

  actif:boolean = false;

  ngOnInit() {
    this.duree =  {start:null,end:null,secondsPassed:0};
  }

  constructor() {
  }



  public startTimer() {
    if(this.duree.start == null) {
      this.duree.start = new Date();
    }
    if(!this.actif) {
      let timer = Observable.timer(1, 1000);
      this.sub = timer.subscribe(
        t => {
          this.duree.secondsPassed++;
        }
      );
      this.actif = true;
    }
  }

  public stop(): void  {
    if(this.actif) {
      this.duree.end=new Date();
      this.sub.unsubscribe();
      this.actif = false;
    }
  }


}
