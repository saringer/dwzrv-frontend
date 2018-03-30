import {Dogpass} from "./dogpass";
import {Tournament} from "./tournament";

export class Race {

  public raceTime: string;
  public notfinished: boolean = false;
  public dogname: string;
  public points: number;

  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public raceClass: string,
              public distance: string) {

  }

}
