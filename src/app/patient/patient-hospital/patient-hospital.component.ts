import { API_URL } from "../../shared_config";
import { MomentService } from "./../../services/moment.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HospitalService } from "src/app/services/hospital.service";
import { DoctorService } from "src/app/services/doctor.service";
import { Ng7DynamicBreadcrumbService } from "ng7-dynamic-breadcrumb";

@Component({
  selector: "app-patient-hospital",
  templateUrl: "./patient-hospital.component.html",
  styleUrls: ["./patient-hospital.component.css"]
})
export class PatientHospitalComponent implements OnInit {
  hospitalId;
  hospital;
  doctor_count;
  doctors;

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private moment: MomentService,
    private bservice: Ng7DynamicBreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.hospitalId = res.hospital_id;
      this.get_hospital(this.hospitalId);
      this.get_doctors(this.hospitalId);
    });
  }

  getTime(timeString) {
    return this.moment.getTime(timeString);
  }

  get_hospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status) {
        this.hospital = res.hospital;

        this.hospital.image =
          this.hospital.image && `${API_URL}/${this.hospital.image}`;

        const breadcrumb = { hospital_data: this.hospital.name };
        this.bservice.updateBreadcrumbLabels(breadcrumb);
      }
    });
  }

  get_doctors(id) {
    this.doctors = [];
    this.doctorService.get_doctors_by_hospital(id).subscribe(res => {
      if (res.status) {
        this.doctors = res.list;
        this.doctor_count = res.count;
      }
    });
  }

  profile(id) {
    this.router.navigateByUrl(
      `patient/hospital/${this.hospitalId}/doctor/${id}`
    );
  }
}
