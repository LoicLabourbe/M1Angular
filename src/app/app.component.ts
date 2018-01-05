import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de gestion de temps';

  constructor(private dataService:DataService, private router: Router) { }

  actualMenu:string;

  ngOnInit(){
    this.actualMenu="home";
    if (localStorage.getItem('nbCategorie') === null)
    {
      localStorage.setItem('nbCategorie','0');
    }
    if (localStorage.getItem('nbAct') === null)
    {
      localStorage.setItem('nbAct','0');
    }
    this.dataService.initialiseCategorie();
    this.dataService.initialiseActivite();
  }

  goHome():void{
    this.router.navigate(['/home']);
    this.actualMenu="home";
  }

  changeActualMenu(menu:string):void{
    this.actualMenu=menu;
    console.log("actual menu="+this.actualMenu);

  }

}

