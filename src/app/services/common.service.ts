import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private heading_subject = new Subject<any>();

  constructor() {}

  nav_heading_Observable(heading) {
    return this.heading_subject.next({ heading });
  }

  nav_heading_subscription() {
    return this.heading_subject.asObservable();
  }

  //   eventHit() {
  //     this.socket.emit("schedule_appointment");
  //   }

  //   appointment_scheduled() {
  //     let observable = new Observable<any>(observer => {
  //       this.socket.on("appointment_scheduled", data => {
  //         observer.next(data);
  //       });
  //       return () => {
  //         this.socket.disconnect();
  //       };
  //     });
  //     return observable;
  //   }
}
