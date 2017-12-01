export class Tournament {

  constructor(
    public id: number,
    public title: string,
    public tournamenttype: string,
    public street: string,
    public postalcode: string,
    public city: string,
    public country: string,
    public date: Date
  ) {

  }

}
