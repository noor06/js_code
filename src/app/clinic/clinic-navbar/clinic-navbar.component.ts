import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HospitalService } from "src/app/services/hospital.service";
import { AdminService } from "src/app/services/admin.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-clinic-navbar",
  templateUrl: "./clinic-navbar.component.html",
  styleUrls: ["./clinic-navbar.component.css"]
})
export class ClinicNavbarComponent implements OnInit {
  logged_hospital;
  hospital;

  nav_heading;

  constructor(
    private toastr: ToastrService,
    private hospitalService: HospitalService,
    private router: Router,
    private adminService: AdminService,
    private common: CommonService
  ) {
    if (window.location.pathname.includes("slot")) {
      this.nav_heading = "Slots";
    } else if (window.location.pathname.includes("appointment")) {
      this.nav_heading = "Appointments";
    } else if (window.location.pathname.includes("doctor")) {
      this.nav_heading = "Doctors";
    } else if (window.location.pathname.includes("department")) {
      this.nav_heading = "Departments";
    } else if (window.location.pathname.includes("hospital")) {
      this.nav_heading = "Hospitals";
    } else if (window.location.pathname.includes("dashboard")) {
      this.nav_heading = "Dashboard";
    } else if (window.location.pathname.includes("updates")) {
      this.nav_heading = "Updates";
    } else if (window.location.pathname.includes("account")) {
      this.nav_heading = "Account";
    }
  }

  ngOnInit() {
    this.logged_hospital = localStorage.getItem("hospital");
    this.get_Hospital(this.logged_hospital);

    this.common.nav_heading_subscription().subscribe(res => {
      this.nav_heading = res.heading;
    });
  }

  get_Hospital(id) {
    this.hospitalService.get_hospital(id).subscribe(response => {
      if (response.status) {
        this.hospital = response.hospital;
      }
    });
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
        this.router.navigateByUrl("login");
      }
    });
  }

  toggle_navbar() {
    $(document).ready(() => {
      $("#menu_closer").toggleClass("menu_closer_show");
    });
    this.adminService.sidemenu_Observable();
  }
}
