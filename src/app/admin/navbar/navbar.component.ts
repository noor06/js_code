import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "src/app/services/admin.service";
import * as $ from "jquery";
import { CommonService } from "src/app/services/common.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  @Input() admin: any;
  nav_heading;

  updates_count = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private common: CommonService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    if (window.location.pathname.includes("slot")) {
      this.nav_heading = "Slot";
    } else if (window.location.pathname.includes("appointment")) {
      this.nav_heading = "Appointment";
    } else if (window.location.pathname.includes("doctor")) {
      this.nav_heading = "Doctor";
    } else if (window.location.pathname.includes("department")) {
      this.nav_heading = "Department";
    } else if (window.location.pathname.includes("hospital")) {
      this.nav_heading = "Hospital";
    } else if (window.location.pathname.includes("dashboard")) {
      this.nav_heading = "Dashboard";
    } else if (window.location.pathname.includes("updates")) {
      this.nav_heading = "Updates";
    } else if (window.location.pathname.includes("account")) {
      this.nav_heading = "Account";
    } else if (window.location.pathname.includes("patient")) {
      this.nav_heading = "Patient";
    } else if (window.location.pathname.includes("request")) {
      this.nav_heading = "Requests";
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("slot")) {
          this.nav_heading = "Slot";
        } else if (event.url.includes("appointment")) {
          this.nav_heading = "Appointment";
        } else if (event.url.includes("doctor")) {
          this.nav_heading = "Doctor";
        } else if (event.url.includes("department")) {
          this.nav_heading = "Department";
        } else if (event.url.includes("hospital")) {
          this.nav_heading = "Hospital";
        } else if (event.url.includes("dashboard")) {
          this.nav_heading = "Dashboard";
        } else if (event.url.includes("updates")) {
          this.nav_heading = "Updates";
        } else if (event.url.includes("account")) {
          this.nav_heading = "Account";
        } else if (event.url.includes("patient")) {
          this.nav_heading = "Patient";
        } else if (event.url.includes("request")) {
          this.nav_heading = "Requests";
        }
      }
    });
  }

  ngOnInit() {
    this.common.nav_heading_subscription().subscribe(res => {
      this.nav_heading = res.heading;
    });

    this.notificationService.updates_count_subscription().subscribe(res => {
      console.log("update count: ", res);
      this.updates_count = 0;
      if (res.unread_count) {
        this.updates_count = res.unread_count;
      }
    });
  }

  updates_heading(heading) {
    this.nav_heading = heading;
  }

  toggle_navbar() {
    $(document).ready(() => {
      $("#menu_closer").toggleClass("menu_closer_show");
    });
    this.adminService.sidemenu_Observable();
  }

  logout() {
    Swal.fire({
      title: "Logout",
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      if (result.value) {
        localStorage.clear();
        this.toastr.success("Bye!");
        this.router.navigateByUrl("admin/login");
      }
    });
  }
}
