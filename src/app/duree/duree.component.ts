import { Component, OnInit } from '@angular/core';
import {Duree} from '../Classes/duree';

@Component({
  selector: 'app-duree',
  templateUrl: './duree.component.html',
  styleUrls: ['./duree.component.css']
})
export class DureeComponent implements OnInit {

  duree: Duree = {start: new Date(1995, 0, 30), end: new Date()};


  constructor() {
  }

  ngOnInit() {
  }

  timeElapsed(): number {
    return (this.duree.end.getTime() - this.duree.start.getTime()) / 1000;
  }
}
