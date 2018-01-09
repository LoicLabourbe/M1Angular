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


  title:string;
  allActivities:Activity[];
  nomCategorie:string;
  id:number;


  constructor(private dataService:DataService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id==null){
      this.title="Activités récentes";
      this.allActivities=this.dataService.getActivities();
    }else{
      this.title = 'Catégorie : ';
      this.allActivities = [];
      this.nomCategorie = this.dataService.getCategoryById(this.id).libelle;
      let length = this.dataService.getActivitiesByCategory(this.id).length;
      for(let i=0; i<length; i++) {
        this.allActivities.push(this.dataService.getActivitiesByCategory(this.id)[i]);
      }
      if(this.allActivities.length === 0){
        this.title = 'Aucune activité pour la catégorie : ';
      }
    }
  }
}
