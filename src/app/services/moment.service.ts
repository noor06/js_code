import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class MomentService {
  constructor() {}

  getTime(timeString) {
    return moment(timeString, "HH:mm A");
  }
}
