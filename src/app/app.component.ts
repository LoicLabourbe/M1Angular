import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de gestion de temps';

  constructor(private dataService:DataService) { }

  ngOnInit(){
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

}

