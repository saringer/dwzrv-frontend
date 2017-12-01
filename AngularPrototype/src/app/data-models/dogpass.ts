import {Dogowner} from "./dogowner";

export class Dogpass {

  constructor(
    public id: number,
    public passport_no: string,
    public name: string,
    public race: string,
    public sex: string,
    public chip_no: number,
    public coat_colour: string,
    public breeder: string,
    public date_of_birth: Date,
    public owner: Dogowner
  ) {

  }

}
