import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng7DynamicBreadcrumbService } from "ng7-dynamic-breadcrumb";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-admin-doctor-profile",
  templateUrl: "./admin-doctor-profile.component.html",
  styleUrls: ["./admin-doctor-profile.component.css"]
})
export class AdminDoctorProfileComponent implements OnInit {
  doctor;
  doctor_id;
  hospital_id;
  obj;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private bservice: Ng7DynamicBreadcrumbService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctor_id = params.doctor_id;
      this.hospital_id = params.hospital_id;
      this.getDoctor(this.doctor_id);
      this.getHospital(this.hospital_id);
    });
    this.doctorService.get_doctor_by_id(this.doctor_id).subscribe(res => {
      if (res.status) {
        this.doctor = res.doctor;
        console.log(this.doctor);
      }
    });
  }

  getHospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      const breadcrumb = { hospital_name: res.hospital.name };
      this.bservice.updateBreadcrumbLabels(breadcrumb);
    });
  }

  getDoctor(id) {
    this.doctorService.get_doctor_by_id(id).subscribe(res => {
      const breadcrumb = { doctor_name: res.doctor.name };
      this.bservice.updateBreadcrumbLabels(breadcrumb);
    });
  }
}
