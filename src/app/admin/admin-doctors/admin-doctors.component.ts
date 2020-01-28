import { Component, OnInit, TemplateRef } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import * as $ from "jquery";
import { Router } from "@angular/router";
import { API_URL } from "../../shared_config";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import * as moment from "moment";
import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "app-admin-doctors",
  templateUrl: "./admin-doctors.component.html",
  styleUrls: ["./admin-doctors.component.css"]
})
export class AdminDoctorsComponent implements OnInit {
  hospitals;
  loading = false;
  hospital_id;
  doctors_table_flag;
  doctors;
  datatable_doctors: any;
  hospitalID = "";
  table_flag = false;
  album = [];
  search_text = "";
  modalRef: BsModalRef;
  filter_hospital = "";
  filter_on: Boolean;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private router: Router,
    private modalService: BsModalService,
    private lightbox: Lightbox,
    private lightbox_config: LightboxConfig
  ) {
    this.lightbox_config.centerVertically = true;
  }

  ngOnInit() {
    this.getAllDoctors();
    this.getHospitalList();
    $(".dropdown-toggle").click(function() {
      $(this)
        .parent()
        .toggleClass("opend");
    });
  }

  remove_dropdown() {
    // $(".btn-group.opend .dropdown-menu .btn").click(function() {
    $(".btn-group.opend").toggleClass("opend");
    // });
  }

  clear_all(e) {
    if (e.target.value === "") {
      if (this.datatable_doctors) {
        this.datatable_doctors.destroy();
      }
      this.getAllDoctors();
    }
  }

  search_doctor(search_text) {
    this.filter_hospital = "";
    this.remove_dropdown();
    if (search_text !== "") {
      this.loading = true;
      this.doctorService.search_doctor(search_text).subscribe(res => {
        this.loading = false;
        if (res.status === true) {
          if (this.datatable_doctors) {
            this.datatable_doctors.destroy();
          }
          this.doctors_table_flag = true;
          this.doctors = res.searched_items;
          // lightbox module
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
          // datatable
          setTimeout(() => {
            // for slots table tab
            const doctors: any = $("#doctor_datatable");
            this.datatable_doctors = doctors.DataTable({
              searching: false,
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

  cancel_filter() {
    this.filter_hospital = "";
    this.remove_dropdown();
    if (this.datatable_doctors) {
      this.datatable_doctors.destroy();
    }
    this.filter_on = false;
    this.getAllDoctors();
  }

  filter_apply() {
    this.filter_on = true;
    this.select_hospital(this.filter_hospital);
    this.remove_dropdown();
  }

  select_hospital(e) {
    this.hospitalID = e;
    if (this.hospitalID !== "") {
      if (this.datatable_doctors) {
        this.datatable_doctors.destroy();
      }
      this.getDoctorsByHospitalID(this.hospitalID);
    }
  }

  getHospitalList() {
    this.hospitalService.get_hospitals().subscribe(res => {
      if (res.status) {
        this.hospitals = res.list;
      }
    });
  }

  getTime(time) {
    return moment(`${time}:00`, "HH:mm:ss").format("hh:mm A");
  }

  getAllDoctors() {
    this.loading = true;
    this.doctors_table_flag = false;
    this.doctorService.get_all_doctors().subscribe(res => {
      this.loading = false;
      if (res.status === true) {
        this.doctors = res.list;
        this.doctors_table_flag = true;
        // lightbox module
        this.doctors &&
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

        // datatable
        setTimeout(() => {
          // for slots table tab
          const doctors: any = $("#doctor_datatable");
          this.datatable_doctors = doctors.DataTable({
            searching: false,
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

  getDoctorsByHospitalID(id) {
    this.doctors = [];
    this.doctorService.get_doctors_by_hospital(id).subscribe(response => {
      this.table_flag = true;
      this.doctors = response.list;
      this.doctors.forEach((item, i) => {
        this.doctors[i].working_days = JSON.parse(this.doctors[i].working_days);
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
      setTimeout(() => {
        // for slots table tab
        const doctors: any = $("#doctor_datatable");
        this.datatable_doctors = doctors.DataTable({
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

  getlisting(list) {
    return JSON.parse(list);
  }

  add_doctor_navigation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  choose_hospital(e) {
    this.router.navigateByUrl(`admin/doctor/${e.target.value}/add`);
    this.modalRef.hide();
  }

  delete_doctor(id, h_id) {
    Swal.fire({
      title: "Deleting doctor...",
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      if (result.value) {
        this.doctorService.delete_doctor(id).subscribe(res => {
          if (this.datatable_doctors) {
            this.datatable_doctors.destroy();
          }
          this.getAllDoctors();
        });
      } else {
        if (this.datatable_doctors) {
          this.datatable_doctors.destroy();
        }
        this.getAllDoctors();
      }
    });
  }
}
