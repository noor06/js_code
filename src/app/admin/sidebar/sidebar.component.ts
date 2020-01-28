import { AdminService } from "src/app/services/admin.service";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  @Input() admin: any;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private common: CommonService
  ) {
    this.adminService.sidemenu_Obs().subscribe(res => {
      if (res.flag) {
        this.collapse_navbar();
      }
    });
  }

  nav_heading(heading) {
    this.common.nav_heading_Observable(heading);
  }

  openTree() {
    $(document).ready(() => {
      $("ul li").click(function() {
        if ($(this).hasClass("current")) {
          $(this).removeClass("current");
        } else {
          $("li a.current").removeClass("current");
          $(this).addClass("current");
        }
      });
    });
  }

  collapse_navbar() {
    $(document).ready(() => {
      $("body").toggleClass("menu_expand");
    });
  }

  ngOnInit() {
    $(document).ready(() => {
      $(".sidebar_options ul li").click(() => {
        if (window.screen.width <= 767) {
          this.collapse_navbar();
          $("#menu_closer").toggleClass("menu_closer_show");
        }
      });
    });
  }

  navigate_admin_home() {
    this.router.navigateByUrl("admin");
  }
}
