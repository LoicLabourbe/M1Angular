import {Component, Input, OnInit} from '@angular/core';
import {Duree} from '../Classes/duree';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-duree',
  templateUrl: './duree.component.html',
  styleUrls: ['./duree.component.css']
})
export class DureeComponent implements OnInit {

  @Input()
  duree: Duree;

  sub: Subscription;

  ngOnInit() {
  }

  constructor() {
  }

  public startTimer() {
    this.duree.start = new Date();
    let timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(
      t => {
        this.duree.secondsPassed++;
      }
    );
  }

  public stopTimer(): void  {
      this.duree.end=new Date();
      this.sub.unsubscribe();
  }


}
