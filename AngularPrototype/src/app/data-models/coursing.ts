import {Dogpass} from "./dogpass";
import {Tournament} from "./tournament";

export class Coursing {


  public coursingPlacement: number;
  public notfinished: boolean = false;
  public disqualified: boolean = false;
  public injured: boolean = false;
  public withdrawn: boolean = false;
  public notstarted: boolean = false;

  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public dogname: string,
              public coursingClass: string,
              public coursingRating: number) {

  }

}
