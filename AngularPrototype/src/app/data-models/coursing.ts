import {Dogpass} from "./dogpass";
import {Tournament} from "./tournament";

export class Coursing {

  public coursingRating: number;
  public coursingPlacement: number;

  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public dogname: string,
              public coursingClass: string) {

  }

}
