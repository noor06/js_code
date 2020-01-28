import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { DoctorService } from "../services/doctor.service";
import { HospitalService } from "../services/hospital.service";
import * as _ from "lodash";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"]
})
export class PatientComponent implements OnInit {
  breadcrumb = [];
  hospital_name = "";
  doctor_name = "";
  h_id;
  d_id;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private hospitalService: HospitalService
  ) {
    const url = window.location.pathname;
    if (url.includes("/patient/hospital")) {
      this.breadcrumb = [];
      const link = {
        link: "/patient/hospital",
        name: "Hospitals"
      };
      this.breadcrumb.push(link);
    }
    if (url.includes("/patient/hospital/")) {
      this.breadcrumb = [];
      const hos_id = url.split("/")[3];
      this.breadcrumb.push({ link: "/patient/hospital", name: "Hospitals" });
      this.gethospital(hos_id);
    }
    if (url.includes("/doctor/")) {
      const hos_id = url.split("/")[3];
      const doc_id = url.split("/")[5];
      this.breadcrumb.push({ link: "/patient/hospital", name: "Hospitals" });
      this.gethospital(hos_id);
      this.getdoctor(doc_id);
    }
    if (!url.includes("/patient/hospital")) {
      this.breadcrumb = [];
    }

    this.router.events.subscribe(eve => {
      if (eve instanceof NavigationEnd) {
        if (eve.url.includes("/patient/hospital")) {
          this.breadcrumb = [];
          const link = {
            link: "/patient/hospital",
            name: "Hospitals"
          };
          this.breadcrumb.push(link);
        }
        if (eve.url.includes("/patient/hospital/")) {
          this.breadcrumb = [];
          const hos_id = eve.url.split("/")[3];
          this.breadcrumb.push({
            link: "/patient/hospital",
            name: "Hospitals"
          });
          this.gethospital(hos_id);
        }
        if (eve.url.includes("/doctor/")) {
          const hos_id = eve.url.split("/")[3];
          const doc_id = eve.url.split("/")[5];
          this.breadcrumb.push({
            link: "/patient/hospital",
            name: "Hospitals"
          });
          this.gethospital(hos_id);
          setTimeout(() => {
            this.getdoctor(doc_id);
          }, 30);
        }
        if (!eve.url.includes("/patient/hospital")) {
          this.breadcrumb = [];
        }
      }
    });
  }

  ngOnInit() {}

  gethospital(id) {
    this.h_id = id;
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status) {
        this.hospital_name = res.hospital.name;
        const link = {
          link: `/patient/hospital/${this.h_id}`,
          name: this.hospital_name
        };
        this.breadcrumb[1] = link;
        this.breadcrumb = _.uniqBy(this.breadcrumb, "name");
      }
    });
  }

  getdoctor(id) {
    this.d_id = id;
    this.doctorService.get_doctor_by_id(id).subscribe(res => {
      if (res.status) {
        this.doctor_name = res.doctor.name;
        const link = {
          link: `/patient/hospital/${this.h_id}/doctor/${this.d_id}`,
          name: this.doctor_name
        };
        this.breadcrumb[2] = link;
        this.breadcrumb = _.uniqBy(this.breadcrumb, "name");
      }
    });
  }
}
