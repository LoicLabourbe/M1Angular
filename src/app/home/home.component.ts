import {Component, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {


  title = 'Menu de l\'application';
  allActivities:Activity[];


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allActivities=this.dataService.getActivities();
  }

}
