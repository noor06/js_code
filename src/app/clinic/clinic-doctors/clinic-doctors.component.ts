import { API_URL } from "./../../shared_config";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import Swal from "sweetalert2";
import { DoctorService } from "src/app/services/doctor.service";
import { Lightbox, LightboxConfig } from "ngx-lightbox";

@Component({
  selector: "app-clinic-doctors",
  templateUrl: "./clinic-doctors.component.html",
  styleUrls: ["./clinic-doctors.component.css"]
})
export class ClinicDoctorsComponent implements OnInit {
  doctors;
  logged_hospital;
  loading = false;

  album = [];

  dataTable_doctors: any;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private lightbox_config: LightboxConfig,
    private lightbox: Lightbox
  ) {
    this.lightbox_config.centerVertically = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.logged_hospital = localStorage.getItem("hospital");
      if (this.dataTable_doctors) {
        this.dataTable_doctors.destroy();
      }
      this.getDoctors(this.logged_hospital);
    });
  }

  getDoctors(id) {
    this.loading = true;
    this.doctors = [];
    this.doctorService.get_doctors_by_hospital(id).subscribe(response => {
      if (response.status) {
        this.doctors = response.list;

        this.doctors.forEach((item, i) => {
          this.doctors[i].working_days = JSON.parse(
            this.doctors[i].working_days
          );
          this.doctors[i].profile_pic =
            this.doctors[i].profile_pic &&
            `${API_URL}/${this.doctors[i].profile_pic}`;

          const src = `${this.doctors[i].profile_pic}`;
          const caption = `${this.doctors[i].name}`;
          const thumb = "";
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };

          this.album.push(album);
        });

        this.loading = false;
        setTimeout(() => {
          // for doctors table tab
          const doctors: any = $("#clinic_doctors_table");
          this.dataTable_doctors = doctors.DataTable({
            searching: true,
            paging: true,
            info: false,
            columnDefs: [
              {
                orderable: false,
                targets: "no-sort"
              }
            ]
          });
          $(".dataTables_filter input").attr(
            "placeholder",
            "Enter search terms here"
          );
        }, 0);
      }
    });
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  delete_doc(id) {
    Swal.fire({
      title: "Deleting Doctor ...",
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      this.loading = true;
      if (result.value) {
        this.loading = true;
        this.doctorService.delete_doctor(id).subscribe(res => {
          this.loading = false;
          if (res.status) {
            this.toastr.success(res.message);
            this.getDoctors(this.logged_hospital);
          }
        });
      }
      this.getDoctors(this.logged_hospital);
    });
  }
}
