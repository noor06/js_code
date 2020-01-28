import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import { API_URL } from "../../shared_config";

@Component({
  selector: "app-doctor-profile",
  templateUrl: "./doctor-profile.component.html",
  styleUrls: ["./doctor-profile.component.css"]
})
export class DoctorProfileComponent implements OnInit {
  doctor;
  doctor_id;
  hospital_id;
  modalRef: BsModalRef;
  obj;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private modalService: BsModalService,
    private router: Router,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctor_id = params.doctor_id;
      this.hospital_id = params.hospital_id;
    });
    this.doctorService.get_doctor_by_id(this.doctor_id).subscribe(res => {
      if (res.status) {
        this.doctor = res.doctor;
        this.doctor.profile_pic =
          this.doctor.profile_pic && `${API_URL}/${this.doctor.profile_pic}`;
      }
    });
  }

  book(template: TemplateRef<any>) {
    this.obj = {
      hospitalId: this.hospital_id,
      doctorId: this.doctor_id
    };
    this.modalRef = this.modalService.show(template);
  }

  booked() {
    this.router.navigateByUrl("patient/appointment");
  }
}
