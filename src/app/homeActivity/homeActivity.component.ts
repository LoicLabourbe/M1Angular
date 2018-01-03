import {Component, OnInit} from '@angular/core';
import {Activity} from '../Classes/activity';
import {DataService} from '../services/data.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-homeActivity',
  templateUrl: './homeActivity.component.html',
  styleUrls: ['./homeActivity.component.css']
})


export class HomeActivityComponent implements OnInit {


  title = 'Menu de la catégorie : ';
  allActivities:Activity[];
  nomCategorie:string;
  id:number;


  constructor(private dataService:DataService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.allActivities=this.dataService.getActivitiesByCategory(this.id);
    if(this.allActivities.length == 0){
      this.title = 'Aucune activité pour cette catégorie';
      this.nomCategorie = '';
    }else{
      this.nomCategorie = this.allActivities[0].category.libelle;
    }
  }

}
