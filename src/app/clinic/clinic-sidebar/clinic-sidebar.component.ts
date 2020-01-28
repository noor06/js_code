import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { CommonService } from "src/app/services/common.service";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-clinic-sidebar",
  templateUrl: "./clinic-sidebar.component.html",
  styleUrls: ["./clinic-sidebar.component.css"]
})
export class ClinicSidebarComponent implements OnInit {
  logged_hospital;

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private adminService: AdminService
  ) {
    this.adminService.sidemenu_Obs().subscribe(res => {
      if (res.flag) {
        this.collapse_navbar();
      }
    });
  }

  ngOnInit() {
    // this.logged_hospital = localStorage.getItem("hospital");
    $(document).ready(() => {
      $(".sidebar_options ul li").click(() => {
        if (window.screen.width <= 767) {
          this.collapse_navbar();
          $("#menu_closer").toggleClass("menu_closer_show");
        }
      });
    });
  }

  collapse_navbar() {
    $(document).ready(() => {
      $("body").toggleClass("menu_expand");
    });
  }

  nav_heading(heading) {
    this.common.nav_heading_Observable(heading);
  }
}
