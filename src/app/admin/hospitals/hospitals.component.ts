import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import "datatables.net";
import "datatables.net-bs4";
import * as $ from "jquery";
import { Router } from "@angular/router";
import { HospitalService } from "src/app/services/hospital.service";
import { MomentService } from "src/app/services/moment.service";
import { MessagingService } from "src/app/services/messaging.service";

@Component({
  selector: "app-hospitals",
  templateUrl: "./hospitals.component.html",
  styleUrls: ["./hospitals.component.css"]
})
export class HospitalsComponent implements OnInit {
  hospitals;
  hospital_count = 0;
  loading = false;
  dataTable_hospitals: any;
  constructor(
    private hospitalService: HospitalService,
    private toastr: ToastrService,
    private router: Router,
    private moment: MomentService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    if (this.dataTable_hospitals) {
      this.dataTable_hospitals.destroy();
    }
    this.getHospitals();
  }

  push() {
    this.messagingService
      .pushNotification({
        sender: "Jaskaran",
        message: "Hello"
      })
      .subscribe(res => {
        console.log("push response: ", res);
      });
  }

  getTime(timeString) {
    return this.moment.getTime(timeString);
  }

  getHospitals() {
    this.loading = true;
    this.hospitals = [];
    this.hospitalService.get_hospitals().subscribe(response => {
      if (response.status) {
        this.loading = false;
        this.hospitals = response.list;
        this.hospital_count = response.count;
        setTimeout(() => {
          // for slots table tab
          const hospitals: any = $("#hospitals");
          this.dataTable_hospitals = hospitals.DataTable({
            language: {
              lengthMenu: "Display _MENU_ records per page",
              search: "Search by speciality, address etc....",
              info: "Showing page _PAGE_ of _PAGES_",
              infoFiltered: "(filtered from _MAX_ total records)"
            },
            searching: true,
            responsive: true,
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

  visit(id) {
    this.router.navigateByUrl(`admin/hospital/${id}`);
  }

  add_hospital_navigation() {
    this.router.navigateByUrl("admin/hospital/add");
  }

  delete(id) {
    Swal.fire({
      title: "Delete hospital",
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      this.loading = true;
      if (result.value) {
        this.hospitalService.delete_hospital(id).subscribe(response => {
          this.loading = false;
          if (response.status === "200") {
            if (this.dataTable_hospitals) {
              this.dataTable_hospitals.destroy();
            }
            this.getHospitals();
            this.toastr.success("Deleted successfully");
          }
        });
      } else {
        if (this.dataTable_hospitals) {
          this.dataTable_hospitals.destroy();
        }
        this.getHospitals();
      }
    });
  }
}
