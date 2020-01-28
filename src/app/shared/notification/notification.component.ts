import { API_URL } from "./../../shared_config";
import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  updates = [];
  count;
  unread = 0;
  loading = false;
  unread_count = 0;
  loggedUserId;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const token = localStorage.getItem("accessToken");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.loggedUserId = decodedToken.id;
    this.get_updates();
    // this.notificationService.updates_count_subscription().subscribe(res => {
    //   if (res.added_updates_flag) {
    //   this.get_updates();
    //   }
    // });
  }

  set_read(id) {
    const data = {
      updateId: id,
      userId: this.loggedUserId
    };
    this.notificationService.mark_as_read(data).subscribe(res => {
      if (res.status) {
        this.get_updates();
      }
    });
  }

  getTime(time) {
    return moment(time).format("hh:mm A");
  }

  delete(id) {
    this.notificationService.delete_update(id).subscribe(res => {
      this.get_updates();
    });
  }

  get_updates() {
    this.unread_count = 0;
    this.updates = [];
    this.loading = true;
    this.notificationService.get_updates().subscribe(res => {
      this.loading = false;
      if (res.status === "200") {
        this.updates = res.updates;
        this.updates.forEach((item, i) => {
          this.updates[i].image =
            this.updates[i].image && `${API_URL}/${this.updates[i].image}`;
        });
      }
    });

    // const read_data = await this.notificationService
    //   .getRead(this.loggedUserId)
    //   .toPromise();

    // notifications.notifications.forEach((item, i) => {
    //   notifications.notifications[i].image =
    //     notifications.notifications[i].image &&
    //     `${API_URL}/${notifications.notifications[i].image}`;
    //   if (read_data.status === true) {
    //     read_data.read.forEach((item1, j) => {
    //       if (item.id === item1.updateId) {
    //         notifications.notifications[i].seen = true;
    //       }
    //     });
    //   } else {
    //     notifications.notifications[i].seen = false;
    //   }
    //   this.updates.push(notifications.notifications[i]);
    // });
    // this.loading = false;

    // this.updates.map((item, i) => {
    //   if (item.seen === true) {
    //     this.unread_count = this.unread_count + 0;
    //   } else {
    //     this.unread_count = this.unread_count + 1;
    //   }
    // });

    // this.notificationService.updates_count_Observable({
    //   unread_count: this.unread_count
    // });
  }
}
