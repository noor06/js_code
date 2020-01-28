import { white_space_regex } from "./../../shared_config";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from "src/app/services/department.service";
import { HospitalService } from "src/app/services/hospital.service";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import * as $ from "jquery";

@Component({
  selector: "app-clinic-departments",
  templateUrl: "./clinic-departments.component.html",
  styleUrls: ["./clinic-departments.component.css"]
})
export class ClinicDepartmentsComponent implements OnInit {
  public department_form: FormGroup;

  dataTable_departments: any;
  departments;
  hospitals;
  hospital_id = localStorage.getItem("hospital");

  loading = false;

  modalRef: BsModalRef;

  constructor(
    private departmentService: DepartmentService,
    private hospitalService: HospitalService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.department_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      description: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.get_departments(this.hospital_id);
  }

  add_department() {
    const obj = {
      name: this.department_form.controls["name"].value,
      hospitalId: this.hospital_id,
      description: this.department_form.controls["description"].value
    };
    this.departmentService.addDepartment(obj).subscribe(res => {
      if (res.status === "200") {
        this.destroyDatatable();
        this.department_form.reset();
        this.toastr.success(res.message);
        this.get_departments(this.hospital_id);
        this.modalRef.hide();
      }
    });
  }

  delete_department(id, name) {
    Swal.fire({
      title: `Delete department ${name}`,
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      if (result.value) {
        this.departmentService.delete_department(id).subscribe(res => {
          if (res.status === "200") {
            this.toastr.success(res.message);
            this.destroyDatatable();
            this.get_departments(this.hospital_id);
          }
        });
      }
    });
  }

  get_departments(hospital_id) {
    this.departmentService.getDepartments(hospital_id).subscribe(res => {
      if (res.status) {
        this.departments = res.departments;
        setTimeout(() => {
          const dep: any = $("#departments");
          this.dataTable_departments = dep.DataTable({
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

  destroyDatatable() {
    if (this.dataTable_departments) {
      this.dataTable_departments.destroy();
    }
  }

  open_dep_form(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
