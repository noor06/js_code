import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.css"]
})
export class FacultyComponent implements OnInit {
  public faculty_login_form: FormGroup;

  loading;

  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}
}
