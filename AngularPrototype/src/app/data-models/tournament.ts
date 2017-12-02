import {Club} from "./club";

export class Tournament {

  constructor(
    public id: number,
    public title: string,
    public tournamenttype: string,
    public club: Club,
    public date: Date
  ) {

  }

}
