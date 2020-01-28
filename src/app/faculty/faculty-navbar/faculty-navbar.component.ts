import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-faculty-navbar",
  templateUrl: "./faculty-navbar.component.html",
  styleUrls: ["./faculty-navbar.component.css"]
})
export class FacultyNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {
    console.log("logout method");
  }
}
