import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EMAIL_REGEX } from "../../shared_config";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
  public admin_login_form: FormGroup;
  loading = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.admin_login_form = this.fb.group({
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

  admin_login() {
    if (this.admin_login_form.valid) {
      this.loading = true;
      const admin = {
        email: this.admin_login_form.controls["email"].value,
        password: this.admin_login_form.controls["password"].value
      };
      this.adminService.admin_login(admin).subscribe(res => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);

        if (res.status === "200") {
          this.toastr.success("Welcome Admin");
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("loggedUser", res.email);
          this.router.navigateByUrl("admin");
        } else {
          this.admin_login_form.controls["password"].patchValue("");
        }
      });
    } else {
      Object.keys(this.admin_login_form.controls).forEach(key => {
        this.admin_login_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
}
