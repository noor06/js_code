import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClinicService } from "../../services/clinic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-hospital-login",
  templateUrl: "./hospital-login.component.html",
  styleUrls: ["./hospital-login.component.css"]
})
export class HospitalLoginComponent implements OnInit {
  public hospital_login_form: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clinicService: ClinicService,
    private toastr: ToastrService
  ) {
    this.hospital_login_form = this.fb.group({
      h_id: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.hospital_login_form.valid) {
      this.loading = true;
      const clinic = {
        h_id: this.hospital_login_form.controls["h_id"].value,
        password: this.hospital_login_form.controls["password"].value
      };
      this.clinicService.login(clinic).subscribe(response => {
        this.loading = false;
        if (response.status === "200") {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("hospital", response.hospital_id);
          this.toastr.success(response.message);
          this.router.navigateByUrl(`clinic/doctor`);
        }
      });
    } else {
      Object.keys(this.hospital_login_form.controls).forEach(key => {
        this.hospital_login_form.controls[key].markAsTouched({
          onlySelf: true
        });
      });
    }
  }
}
