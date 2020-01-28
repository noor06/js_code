import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { Router, NavigationEnd } from "@angular/router";
import { HospitalService } from "../services/hospital.service";
import { DoctorService } from "../services/doctor.service";
import * as _ from "lodash";
import { NotificationService } from "../services/notification.service";
import { JwtHelperService } from "@auth0/angular-jwt";
// import * as io from "socket.io-client";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  admin: any;
  breadcrumb = [];
  hospital_name = "";
  doctor_name = "";
  h_id;
  d_id;

//   socket: any;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.get_admin();
    // this.getUpdateCounts();
  }

//   async getUpdateCounts() {
//     const token = localStorage.getItem("accessToken");
//     const helper = new JwtHelperService();
//     const decodedToken = helper.decodeToken(token);
//     var updates = [];
//     var unread_count = 0;

//     var notifications = await this.notificationService
//       .get_updates()
//       .toPromise();
//     const read_data = await this.notificationService
//       .getRead(decodedToken.id)
//       .toPromise();

//     notifications.notifications.forEach((item, i) => {
//       if (read_data.status === true) {
//         read_data.read.forEach((item1, j) => {
//           if (item.id === item1.updateId) {
//             notifications.notifications[i].seen = true;
//           }
//         });
//       } else {
//         notifications.notifications[i].seen = false;
//       }
//       updates.push(notifications.notifications[i]);
//     });

//     updates.map((item, i) => {
//       if (item.seen === true) {
//         unread_count = unread_count + 0;
//       } else {
//         unread_count = unread_count + 1;
//       }
//     });

//     this.notificationService.updates_count_Observable({
//       unread_count
//     });
//   }

  get_admin() {
    this.adminService.get_admin().subscribe(response => {
      this.admin = response.admin;
      //   this.socket = io.connect(`${SOCKET_URL}/${this.admin.id}`);
      //   console.log("socket: ", this.socket);
    });
  }
}
