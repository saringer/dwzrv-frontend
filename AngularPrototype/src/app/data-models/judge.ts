import {Tournament} from "./tournament";

export class Judge {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public nationality: string,
    public tournaments: Tournament[]

  ) {

  }

}
