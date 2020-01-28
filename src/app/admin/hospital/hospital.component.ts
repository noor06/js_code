import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import "datatables.net";
import "datatables.net-bs4";
import { HospitalService } from "src/app/services/hospital.service";
import { DoctorService } from "src/app/services/doctor.service";
import { Ng7DynamicBreadcrumbService } from "ng7-dynamic-breadcrumb";
import { API_URL } from "../../shared_config";

@Component({
  selector: "app-hospital",
  templateUrl: "./hospital.component.html",
  styleUrls: ["./hospital.component.css"]
})
export class HospitalComponent implements OnInit {
  hospital;
  loading = false;
  hospital_id;
  doctors;
  datatable_doctors: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private bservice: Ng7DynamicBreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getHospital(params.hospital_id);
      this.hospital_id = params.hospital_id;
    });
  }

  add_doctor_navigation() {
    this.router.navigateByUrl(`admin/hospital/${this.hospital_id}/doctor/add`);
  }

  upload_image(e) {
    var formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("id", this.hospital_id);
    this.hospitalService.upload_image(formData).subscribe(res => {
      if (res.status === "200") {
        this.toastr.success(res.message);
        this.getHospital(this.hospital_id);
      }
    });
  }

  //   deleteDoctor(id) {
  //     Swal.fire({
  //       title: "Deleting Doctor ...",
  //       text: "Are you sure ?",
  //       type: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes sure"
  //     }).then(result => {
  //       this.loading = true;
  //       if (result.value) {
  //         this.loading = true;
  //         this.doctorService.delete_doctor(id).subscribe(res => {
  //           this.loading = false;
  //           if (res.status) {
  //             this.toastr.success(res.message);
  //             this.getDoctorsByHospitalID(this.hospital_id);
  //           }
  //         });
  //       }
  //     });
  //   }

  getHospital(id) {
    this.loading = true;
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status) {
        this.hospital = res.hospital;
        this.hospital.image =
          this.hospital.image && `${API_URL}/${this.hospital.image}`;
        const breadcrumb = { hospital_name: this.hospital.name };
        this.bservice.updateBreadcrumbLabels(breadcrumb);
      }
    });
  }
}
