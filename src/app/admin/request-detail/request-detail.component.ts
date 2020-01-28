import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.component.html",
  styleUrls: ["./request-detail.component.css"]
})
export class RequestDetailComponent implements OnInit {
  request_detail;

  @Input() modalRef: BsModalRef;

  @Input() id;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getDetails(this.id);
  }

  closeModal() {
    this.modalRef.hide();
  }

  getDetails(id) {
    this.adminService.get_request_detail(id).subscribe(res => {
      this.request_detail = res;
    });
  }

  update_request(item, status) {
    const data = {
      doctorId: item.user,
      hospitalId: item.selected_hospital,
      status,
      admin_comment: "",
      id: item.id
    };

    this.adminService.update_request(data).subscribe(res => {
      if (res.status === "200") {
        this.callBack.emit();
        this.toastr.success(res.message);
        this.getDetails(this.id);
      }
    });
  }
}
