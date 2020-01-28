import { EMAIL_REGEX } from "./../../shared_config";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { PatientService } from "src/app/services/patient.service";

@Component({
  selector: "app-patient-login",
  templateUrl: "./patient-login.component.html",
  styleUrls: ["./patient-login.component.css"]
})
export class PatientLoginComponent implements OnInit {
  public login_form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private patientService: PatientService
  ) {
    this.login_form = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ])
      ],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.login_form.valid) {
      this.loading = true;
      const user = {
        email: this.login_form.controls["email"].value,
        password: this.login_form.controls["password"].value
      };
      this.loginService.login(user).subscribe(res => {
        if (res.status === "200") {
          this.toastr.success("Welcome");
          this.router.navigateByUrl("patient");
          localStorage.setItem("loggedPatient", res.email);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("patientId", res.id);
        }
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
    } else {
      Object.keys(this.login_form.controls).forEach(key => {
        this.login_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
}
