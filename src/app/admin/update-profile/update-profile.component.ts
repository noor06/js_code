import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { PASS_REGEX } from "src/app/shared_config";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"]
})
export class UpdateProfileComponent implements OnInit {
  public password_update_form: FormGroup;
  loading = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.password_update_form = this.fb.group({
      newPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(PASS_REGEX)
        ])
      ],
      confPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(PASS_REGEX)
        ])
      ]
    });
  }

  checkPasswords(a, b) {
    if (a === b) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {}

  updatePassword() {
    if (this.password_update_form.valid) {
      if (
        this.checkPasswords(
          this.password_update_form.controls["newPassword"].value,
          this.password_update_form.controls["confPassword"].value
        )
      ) {
        this.loading = true;
        this.adminService
          .update_password({
            password: this.password_update_form.controls["newPassword"].value,
            newPassword: this.password_update_form.controls["newPassword"].value
          })
          .subscribe(res => {
            this.loading = false;
            if (res.status === "200") {
              localStorage.clear();
              this.router.navigateByUrl("/admin/login");
              this.toastr.success(
                "Password changed successfully, please login using new credentials"
              );
            } else if (res.status === "504") {
              this.toastr.error(res.message);
            }
          });
      } else {
        this.toastr.warning(
          "New password and confirm password must be matched"
        );
      }
    } else {
      Object.keys(this.password_update_form.controls).forEach(key => {
        this.password_update_form.controls[key].markAsTouched({
          onlySelf: true
        });
      });
    }
  }
}
