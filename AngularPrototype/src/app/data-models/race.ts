import {Dogpass} from "./dogpass";
import {Tournament} from "./tournament";

export class Race {

  public points: number;
  public raceTime: string;
  public notfinished: boolean = false;
  public dogname: string;


  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public raceClass: string,
              public distance: string) {

  }

}
