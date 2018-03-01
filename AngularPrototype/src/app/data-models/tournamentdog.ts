import {Club} from "./club";
import {Dogpass} from "./dogpass";
import {Judge} from "./judge";
import {Tournament} from "./tournament";

export class TournamentDog {

  public coursingrating1: number;
  public coursingrating2: number;
  public coursingrating3: number;
  public coursingrating4: number;
  public coursingrating5: number;
  public coursingrating6: number;
  public coursingrating7: number;
  public coursingrating8: number;
  public coursingrating9: number;
  public coursingrating10: number;
  public coursingrating11: number;
  public coursingrating12: number;
  public raceplacement: number;
  public racetime: number;
  public racetimewinner: number;

  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public tournamenttype: string,
              public dogname: string) {

  }

}
