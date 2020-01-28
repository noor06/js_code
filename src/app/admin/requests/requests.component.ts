import { BsModalRef } from "ngx-bootstrap/modal";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"]
})
export class RequestsComponent implements OnInit {
  requests;
  req_count;
  modalRef: BsModalRef;
  selected_id;
  request_detail;

  message = "Hello";

  constructor(
    private adminService: AdminService,
    private doctorService: DoctorService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.get_requests();
  }

  callBackReceived() {
    this.get_requests();
  }

  get_requests() {
    this.adminService.get_requests().subscribe(res => {
      if (res.status === "200") {
        this.requests = res.requests;
        this.req_count = res.count;

        this.requests.forEach(async (item, i) => {
          const temp_data = await this.doctorService
            .get_doctor_by_id(item.user)
            .toPromise();
          this.requests[i].requestee = temp_data.doctor.name;
        });
      }
    });
  }

  open(template: TemplateRef<any>, id) {
    this.selected_id = id;
    this.modalRef = this.modalService.show(template);
  }

  //   get_request_details(id) {
  //     return this.adminService.get_request_detail(id).toPromise();
  //   }
}
