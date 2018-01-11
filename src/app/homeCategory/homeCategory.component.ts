import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Category} from '../Classes/category';

@Component({
  selector: 'app-homeCategory',
  templateUrl: './homeCategory.component.html',
  styleUrls: ['./homeCategory.component.css']
})


export class HomeCategoryComponent implements OnInit {

  allCategories:Category[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.allCategories=this.dataService.getCategories();
  }

}
