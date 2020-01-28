import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientService } from "src/app/services/patient.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PASS_REGEX } from "../../shared_config";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  reset_email;
  token_flag = false;
  loading = false;

  public reset_password_form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private patientService: PatientService
  ) {
    this.reset_password_form = this.fb.group({
      newPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(PASS_REGEX)
        ])
      ],
      conf_newPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(PASS_REGEX)
        ])
      ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const refreshToken = params.token;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(refreshToken);
      this.reset_email = decodedToken.email;
      console.log("==> token: ", helper.isTokenExpired(refreshToken));
      if (helper.isTokenExpired(refreshToken)) {
        this.toastr.error("Token is expired, Request for a new one");
        this.router.navigateByUrl("/login");
      }
    });
  }

  reset_password() {
    if (this.reset_password_form.valid) {
      if (
        this.reset_password_form.controls["newPassword"].value ===
        this.reset_password_form.controls["conf_newPassword"].value
      ) {
        this.loading = true;
        const obj = {
          email: this.reset_email,
          password: this.reset_password_form.controls["newPassword"].value
        };

        this.patientService.resetPassword(obj).subscribe(res => {
          this.loading = false;
          if (res.status === "200") {
            this.toastr.success(res.message);
            this.router.navigateByUrl("/login");
          }
        });
      } else {
        this.toastr.error("New password and confirm password must match");
      }
    } else {
      Object.keys(this.reset_password_form.controls).forEach(key => {
        this.reset_password_form.controls[key].markAsTouched({
          onlySelf: true
        });
      });
    }
  }
}
