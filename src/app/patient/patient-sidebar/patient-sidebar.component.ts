import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import * as $ from "jquery";
import { PatientService } from "src/app/services/patient.service";

@Component({
  selector: "app-patient-sidebar",
  templateUrl: "./patient-sidebar.component.html",
  styleUrls: ["./patient-sidebar.component.css"]
})
export class PatientSidebarComponent implements OnInit {
  patient;
  constructor(
    private adminService: AdminService,
    private patientService: PatientService
  ) {
    this.adminService.sidemenu_Obs().subscribe(res => {
      if (res.flag) {
        this.collapse_navbar();
      }
    });
  }

  collapse_navbar() {
    $(document).ready(() => {
      $("body").toggleClass("menu_expand");
    });
  }

  ngOnInit() {
    this.patientService
      .get_patient(localStorage.getItem("loggedPatient"))
      .subscribe(res => {
        if (res.status) {
          this.patient = res.patient;
        }
      });
  }
}
