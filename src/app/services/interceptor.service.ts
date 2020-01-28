import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse
} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class InterceptorService {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const token = localStorage.getItem("accessToken");
    if (token) {
      req = req.clone({
        headers: req.headers.set("authorization", "Bearer " + token)
      });
    }

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const { status, message, error } = event.body;
            if (status === "401") {
              this.toastr.error(message, "OOPS !!!");
            } else if (status === "403") {
              this.toastr.error(message);
            } else if (status === "500") {
              this.toastr.error(message);
            } else if (status === "404") {
              this.toastr.error(message);
            }
          }
        },
        (err: any) => {
          this.toastr.error(
            "Server Down, try again after some time...",
            "OOPS !!!"
          );
        }
      )
    );
  }
}
