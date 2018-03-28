import {Club} from "./club";
import {Judge} from "./judge";
import {Coursing} from "./coursing";
import {Race} from "./race";

export class Tournament {

  constructor(
    public id: number,
    public title: string,
    public tournamenttype: string,
    public club: Club,
    public date: Date,
    public double_weighted: boolean,
    public participating_judges: Judge[],
    public coursings: Coursing[],
    public races: Race[]
  ) {

  }

}
