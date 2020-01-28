import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AdminService } from "src/app/services/admin.service";
import * as $ from "jquery";
import { HospitalService } from "src/app/services/hospital.service";
import { API_URL } from "../../shared_config";
import * as _ from "lodash";

@Component({
  selector: "app-patient-navbar",
  templateUrl: "./patient-navbar.component.html",
  styleUrls: ["./patient-navbar.component.css"]
})
export class PatientNavbarComponent implements OnInit {
  patient;
  search;
  filter_state = "";
  locator = false;
  filter_city = "";
  filter_count = 0;
  pathname;
  filters;
  available_filters_count = 0;
  search_box_flag = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private hospitalService: HospitalService,
    private route: ActivatedRoute
  ) {
    this.patientService.image_upload_subscription().subscribe(res => {
      if (res.flag) {
        this.getPatient(localStorage.getItem("loggedPatient"));
      }
    });
  }

//   input_focused() {
//     $("#gps_locator").removeClass("none");
//   }

//   input_blur() {
//     $("#gps_locator").addClass("none");
//   }

  ngOnInit() {
    // $("#gps_locator").addClass("none");
    this.getPatient(localStorage.getItem("loggedPatient"));
    this.get_filters();
    if (window.location.pathname === "/patient/hospital") {
      this.search_box_flag = true;
    }
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.url === "/patient/hospital") {
          this.search_box_flag = true;
        } else {
          this.search_box_flag = false;
        }
      }
    });
  }

  search_nearby() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (this.locator) {
          this.locator = false;
        } else {
          this.locator = true;
        }
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.patientService.search_nearby_Observable(this.locator, lat, lng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  get_filters() {
    // getting filters
    this.hospitalService.get_filters().subscribe(res => {
      if (res.status) {
        this.filters = {};
        this.filters.city = _.uniqBy(res.filters, "city");
        this.filters.state = _.uniqBy(res.filters, "state");
        this.available_filters_count = res.filters_count;
        console.log("=> filters: ", this.filters);
      }
    });
  }

  openFilterForm() {
    $(".filter_div .dropdown-toggle")
      .next()
      .toggleClass("show");
  }

  openSearchForm() {
    $(".search_div .dropdown-toggle")
      .next()
      .toggleClass("show");
  }

  clear_filters() {
    this.filter_city = "";
    this.filter_state = "";
    this.filter_count = 0;
    this.patientService.filter_Observable({}, false);
    $(".filter_div .dropdown-menu.show").removeClass("show");
  }

  filter() {
    var filter = {};
    if (
      this.filter_city &&
      this.filter_city !== "" &&
      this.filter_state &&
      this.filter_state !== ""
    ) {
      this.filter_count = 2;
      filter = {
        state: this.filter_state,
        city: this.filter_city
      };
    } else if (this.filter_city && this.filter_city !== "") {
      this.filter_count = 1;
      filter = {
        city: this.filter_city
      };
    } else if (this.filter_state && this.filter_state !== "") {
      this.filter_count = 1;
      filter = {
        state: this.filter_state
      };
    }

    if (Object.keys(filter).length > 0) {
      this.patientService.filter_Observable(filter, true);
    } else {
      this.patientService.filter_Observable(filter, false);
      this.clear_filters();
    }

    $(".filter_div .dropdown-menu.show").removeClass("show");
  }

  search_hospital() {
    this.patientService.search_Observable(this.search);
  }

  toggle_navbar() {
    this.adminService.sidemenu_Observable();
  }

  getPatient(email) {
    this.patientService.get_patient(email).subscribe(response => {
      if (response.status) {
        this.patient = response.patient;
        if (this.patient.profile_pic) {
          this.patient.profile_pic = `${API_URL}/${this.patient.profile_pic}`;
        }
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
        this.toastr.success("Logged out successfully");
        this.router.navigateByUrl("/");
      }
    });
  }
}
