import {Color} from './color';

export class Category{

  libelle:string;
  color:Color;
  id:number;


  constructor(libelle:string,color:Color,id:number){
    this.libelle=libelle;
    this.color=color;
    this.id=id;
  }
}
