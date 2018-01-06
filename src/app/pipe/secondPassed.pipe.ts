import {Pipe,PipeTransform} from "@angular/core";

@Pipe({name:'toTimer'})
export class SecondPassedPipe implements PipeTransform{
  transform(value: number, ...args: any[]): any {
    let hour=Math.trunc(value/3600);
    let min=Math.trunc(value/60);
    let seconds=value%60;
    return hour+":"+(min>9?min:"0"+min)+":"+(seconds>9?seconds:"0"+seconds);
  }
}
