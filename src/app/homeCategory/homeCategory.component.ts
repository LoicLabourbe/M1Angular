import {Component, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {DataService} from '../services/data.service';
import {Category} from '../Classes/category';

@Component({
  selector: 'app-homeCategory',
  templateUrl: './homeCategory.component.html',
  styleUrls: ['./homeCategory.component.css']
})


export class HomeCategoryComponent implements OnInit {


  title = 'Catégories';
  allActivities:Activity[];
  allCategories:Category[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allActivities=this.dataService.getActivities();
    this.allCategories=this.dataService.getCategories();
  }

}
