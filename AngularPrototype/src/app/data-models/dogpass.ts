import {Dogowner} from "./dogowner";
import {Breeder} from "./breeder";
import {Tournament} from "./tournament";
import {Coursing} from "./coursing";

export class Dogpass {

  constructor(public id: number,
              public passport_no: string,
              public name: string,
              public race: string,
              public sex: string,
              public chip_no: string,
              public coat_colour: string,
              public breeder: Breeder,
              public date_of_birth: Date,
              public owner: Dogowner,
              public tournaments: Tournament[],
              public coursings: Coursing[]) {

  }

}
