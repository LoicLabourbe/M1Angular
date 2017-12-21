import {Category} from './category';
import {Duree} from './duree';

export class Activity{
  nom:string;
  description:string;
  category:Category;
  duree:Duree;
  mesDurees:Duree[];



  constructor(nom :string, description:string, category:Category) {
    this.nom=nom;
    this.description=description;
    this.category=category;
    this.duree =new Duree();
    this.mesDurees=[];
  }
}
