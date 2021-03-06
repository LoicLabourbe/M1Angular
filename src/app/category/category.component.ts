import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../Classes/category';
import {Color} from '../Classes/color';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  myCategory:Category;

  libelle:string;
  couleur:Color;
  id:number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.libelle=this.myCategory.libelle;
    this.couleur=this.myCategory.color;
    this.id=this.myCategory.id;
  }

  goToDetail():void{
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/homeActivity', this.id]);
  }

}
