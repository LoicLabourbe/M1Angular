import {Color} from './color';

export class Category{

  libelle:string;
  color:Color;


  constructor(libelle:string,color:Color){
    this.libelle=libelle;
    this.color=color;
  }
}
