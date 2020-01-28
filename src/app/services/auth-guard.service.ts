import { Injectable } from "@angular/core";
import { Router, CanActivate, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService
  implements CanActivate, CanDeactivate<CanComponentDeactivate> {
  constructor(public router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      localStorage.clear();
      if (window.location.pathname.indexOf("/admin") > -1) {
        this.router.navigateByUrl("admin/login");
      } else if (
        window.location.pathname.indexOf("/clinic") > -1 ||
        window.location.pathname.indexOf("/faculty") > -1
      ) {
        this.router.navigateByUrl("login");
      } else {
        this.router.navigateByUrl("/");
      }
      return false;
    } else {
      return true;
    }
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  loginBeforeProceed() {
    this.toastr.warning("You must be logged in.");
  }

  sessionExpiredMessage() {
    this.toastr.error("Your session has been expired, please login again.");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined") {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        return true;
      } else {
        this.sessionExpiredMessage();
        return false;
      }
    } else {
      this.loginBeforeProceed();
      return false;
    }
  }
}
