import { MomentService } from "./../../services/moment.service";
import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient.service";
import { HospitalService } from "src/app/services/hospital.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { API_URL } from "../../shared_config";

@Component({
  selector: "app-patient-hospitals",
  templateUrl: "./patient-hospitals.component.html",
  styleUrls: ["./patient-hospitals.component.css"]
})
export class PatientHospitalsComponent implements OnInit {
  hospitals;
  loading = false;
  hospital_count;
  search_text;
  filter;

  // pagination configuration
  maxSize = 5;
  totalItems;
  currentPage;
  page = 1;

  constructor(
    private patientService: PatientService,
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private moment: MomentService
  ) {
    this.patientService.search_nearby_subscription().subscribe(res => {
      if (res.flag) {
        const { lat, lng } = res;
        this.get_nearby_hospitals(lat, lng);
      } else {
        this.getHospitalList();
      }
    });

    this.patientService.search_subscription().subscribe(response => {
      this.search_text = response.search_text;
    });

    this.patientService.filter_subscription().subscribe(response => {
      if (response.flag) {
        this.filter = {
          filter: response.filter
        };
        this.filter_hospital(this.filter);
      } else {
        this.getHospitalList();
      }
    });
  }

  makeFloat(i) {
    return parseFloat(i);
  }

  getTime(time) {
    return this.moment.getTime(time);
  }

  filter_hospital(filter) {
    this.hospitalService.filter_hospital(filter).subscribe(res => {
      this.hospitals = res.searched_items;
      this.hospitals.forEach((item, i) => {
        this.hospitals[i].image =
          this.hospitals[i].image && `${API_URL}/${this.hospitals[i].image}`;
      });
      this.hospital_count = res.count;
    });
  }

  ngOnInit() {
    this.getHospitalList();
  }

  getHospitalList() {
    this.loading = true;
    this.hospitalService.get_hospitals().subscribe(response => {
      if (response.status) {
        this.loading = false;
        this.hospitals = response.list;
        this.hospital_count = response.count;
        this.hospitals.forEach((item, i) => {
          this.hospitals[i].image =
            this.hospitals[i].image && `${API_URL}/${this.hospitals[i].image}`;
        });
      }
    });
  }

  get_nearby_hospitals(lat, lng) {
    this.loading = true;
    setTimeout(() => {
      this.hospitalService.search_nearby(lat, lng).subscribe(res => {
        if (res.status) {
          this.loading = false;
          this.hospitals = res.list;
          this.hospital_count = res.count;
          this.hospitals.forEach((item, i) => {
            this.hospitals[i].image =
              this.hospitals[i].image &&
              `${API_URL}/${this.hospitals[i].image}`;
          });
        }
      });
    }, 500);
  }
}
