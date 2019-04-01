import {Injectable} from "@angular/core";

@Injectable()
export class DataService {

  public selectedYear: string = String(new Date().getFullYear()-1);

}
