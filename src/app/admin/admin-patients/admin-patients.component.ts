import { API_URL } from "../../shared_config";
import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-patients",
  templateUrl: "./admin-patients.component.html",
  styleUrls: ["./admin-patients.component.css"]
})
export class AdminPatientsComponent implements OnInit {
  patients;
  loading = false;
  datatable_patients: any;

  constructor(
    private patientService: PatientService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
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
