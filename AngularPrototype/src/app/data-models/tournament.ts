import {Club} from "./club";
import {Dogpass} from "./dogpass";
import {Judge} from "./judge";
import {TournamentDog} from "./tournamentdog";

export class Tournament {

  constructor(
    public id: number,
    public title: string,
    public tournamenttype: string,
    public club: Club,
    public date: Date,
    public participating_dogs: Dogpass[],
    public participating_judges: Judge[],
    public tournamentDogs: TournamentDog[]
  ) {

  }

}
