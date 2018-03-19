import {Club} from "./club";
import {Dogpass} from "./dogpass";
import {Judge} from "./judge";
import {Coursing} from "./coursing";

export class Tournament {

  constructor(
    public id: number,
    public title: string,
    public tournamenttype: string,
    public club: Club,
    public date: Date,
    public double_weighted: boolean,
    public participating_judges: Judge[],
    public coursings: Coursing[]
  ) {

  }

}
