import { Component, OnInit } from '@angular/core';
import {COLORS} from '../const/availableColors';
import {Activity} from '../Classes/activity';
import {Category} from '../Classes/category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'Menu de l\'application';


  allCategories:Category[]=[{libelle:"Travail",color:COLORS[0]}
                              ,{libelle:"Détente",color:COLORS[1]}
                              ,{libelle:"Loisirs",color:COLORS[2]}];

  allActivities:Activity[]=[new Activity("Projet","Le projet d'angular",this.allCategories[0])
                            ,new Activity("Repos","Se reposer après avoir bien travaillé",this.allCategories[1])
  ];


  constructor() { }

  ngOnInit() {
  }

}
