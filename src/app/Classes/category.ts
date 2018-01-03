import {Color} from './color';

export class Category{

  private static count=0;

  libelle:string;
  color:Color;
  id:number;


  constructor(libelle:string,color:Color){
    this.libelle=libelle;
    this.color=color;
    this.id=Category.count++;
  }
}
