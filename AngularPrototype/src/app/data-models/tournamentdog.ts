import {Club} from "./club";
import {Dogpass} from "./dogpass";
import {Judge} from "./judge";
import {Tournament} from "./tournament";

export class TournamentDog {

  constructor(public dog: Dogpass,
              public tournament: Tournament,
              public judging: number,
              public tournamenttype: string,
              public dogname: string) {

  }

}
