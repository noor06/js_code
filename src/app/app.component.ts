import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MessagingService } from "./services/messaging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "clinicApp";
  location;
  loading = true;
  message;

  constructor(
    private router: Router,
    private messagingService: MessagingService
  ) {}

  goto() {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined") {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log("Token: ", decodedToken);
      if (decodedToken.role === "Admin") {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/login"
        ) {
          this.router.navigateByUrl("admin");
        }
      } else if (decodedToken.role === "Clinic") {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/login"
        ) {
          this.router.navigateByUrl(`clinic/${decodedToken.hospital_id}`);
        }
      } else if (decodedToken.role === "Doctor") {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/login"
        ) {
          this.router.navigateByUrl(`faculty`);
        }
      } else {
        this.router.navigateByUrl("/");
      }
    }
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      this.goto();
      this.loading = false;
    }, 1000);

    // for firebase messaging
    const userId = "user001";
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
