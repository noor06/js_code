import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-faculty-login",
  templateUrl: "./faculty-login.component.html",
  styleUrls: ["./faculty-login.component.css"]
})
export class FacultyLoginComponent implements OnInit {
  public faculty_login_form: FormGroup;

  loading;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.faculty_login_form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.faculty_login_form.valid) {
      this.loading = true;
      const formData = {
        email: this.faculty_login_form.controls["email"].value,
        password: this.faculty_login_form.controls["password"].value
      };

      this.doctorService.login(formData).subscribe(res => {
        this.loading = false;
        if (res.status === true) {
          this.toastr.success(`Welcome Dr. ${res.data.doctor_info.name}`);
          localStorage.setItem("accessToken", res.data.token);
          this.router.navigateByUrl("/faculty");
        }
      });
    } else {
      Object.keys(this.faculty_login_form.controls).forEach(key => {
        this.faculty_login_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
}
