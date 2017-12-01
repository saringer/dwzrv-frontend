import {Dogowner} from "./dogowner";
import {Breeder} from "./breeder";

export class Dogpass {

  constructor(
    public id: number,
    public passport_no: string,
    public name: string,
    public race: string,
    public sex: string,
    public chip_no: number,
    public coat_colour: string,
    public breeder: Breeder,
    public date_of_birth: Date,
    public owner: Dogowner
  ) {

  }

}
