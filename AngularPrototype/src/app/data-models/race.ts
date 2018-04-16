import {Dogpass} from "./dogpass";
import {Tournament} from "./tournament";

export class Race {

  public points: number;
  public raceTime: string;
  public notfinished: boolean = false;
  public disqualified: boolean = false;
  public injured: boolean = false;
  public withdrawn: boolean = false;
  public notstarted: boolean = false;
  public dogname: string;


  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public raceClass: string,
              public distance: string) {

  }

}
