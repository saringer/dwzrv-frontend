import {Tournament} from "./tournament";

export class Judge {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public street: string,
    public postalcode: string,
    public city: string,
    public country: string,
    public tournaments: Tournament[]

  ) {

  }

}
