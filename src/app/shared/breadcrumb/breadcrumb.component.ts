import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent implements OnInit {
  current_route;
  current_hospital;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hospitalService: HospitalService
  ) {
    this.current_route = window.location.pathname;
  }

  getHospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {});
  }

  ngOnInit() {
    console.log("==>", this.current_route);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == "/patient/hospital") {
          this.current_route = event.url;
        }
      }
    });
  }
}
