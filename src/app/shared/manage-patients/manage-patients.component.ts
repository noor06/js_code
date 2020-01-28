import { API_URL } from "./../../shared_config";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PatientService } from "src/app/services/patient.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Lightbox, LightboxConfig } from "ngx-lightbox";

@Component({
  selector: "app-manage-patients",
  templateUrl: "./manage-patients.component.html",
  styleUrls: ["./manage-patients.component.css"]
})
export class ManagePatientsComponent implements OnInit {
  patients;
  loading = false;
  datatable_patients: any;
  role;

  album = [];

  constructor(
    private patientService: PatientService,
    private toastr: ToastrService,
    private lightbox: Lightbox,
    private lightbox_config: LightboxConfig
  ) {
    this.lightbox_config.centerVertically = true;
  }

  ngOnInit() {
    const token = localStorage.getItem("accessToken");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.role = decodedToken.role;

    if (this.datatable_patients) {
      this.datatable_patients.destroy();
    }
    this.getPatients();
  }

  deletePatient(id) {
    Swal.fire({
      title: `Deleting patient...`,
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      if (result.value) {
        this.patientService.delete_patient(id).subscribe(res => {
          if (res.status === "200") {
            this.toastr.success(res.message);
            if (this.datatable_patients) {
              this.datatable_patients.destroy();
            }
            this.getPatients();
          }
        });
      }
    });
  }

  viewDetails(id) {}

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  getPatients() {
    this.loading = true;
    this.patientService.getPatientList().subscribe(res => {
      this.loading = false;
      if (res.status === true) {
        this.patients = res.patients;

        this.patients.forEach((item, i) => {
          this.patients[i].profile_pic =
            this.patients[i].profile_pic &&
            `${API_URL}/${this.patients[i].profile_pic}`;

          const src = this.patients[i].profile_pic
            ? `${this.patients[i].profile_pic}`
            : "../../assets/images/user-placeholder.png";
          const caption = `${this.patients[i].name}`;
          const thumb = "";
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };

          this.album.push(album);
        });

        setTimeout(() => {
          // for slots table tab
          const patients: any = $("#patient_datatable");
          this.datatable_patients = patients.DataTable({
            searching: true,
            paging: true,
            info: true,
            columnDefs: [
              {
                orderable: false,
                targets: "no-sort"
              }
            ]
          });
        }, 0);
      }
    });
  }
}
