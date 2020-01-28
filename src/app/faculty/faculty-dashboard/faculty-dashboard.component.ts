import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";

@Component({
  selector: "app-faculty-dashboard",
  templateUrl: "./faculty-dashboard.component.html",
  styleUrls: ["./faculty-dashboard.component.css"]
})
export class FacultyDashboardComponent implements OnInit {
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.get_appointments().subscribe(res => {
      console.log(res);
    });
  }
}
