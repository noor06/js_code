import { MomentService } from "./../../services/moment.service";
import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";
import "datatables.net";
import "datatables.net-bs4";
import * as $ from "jquery";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-appointments",
  templateUrl: "./manage-appointments.component.html",
  styleUrls: ["./manage-appointments.component.css"]
})
export class ManageAppointmentsComponent implements OnInit {
  appointments;
  dataTable_appointments: any;
  appointment_count = 0;

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private moment: MomentService,
    private router: Router
  ) {}

  ngOnInit() {
    const email = localStorage.getItem("loggedPatient");
    this.destroy_datatable();
    this.getAppointments(email);
  }

  doctor_profile(docid, hosid) {
    this.router.navigateByUrl(`patient/hospital/${hosid}/doctor/${docid}`);
  }

  destroy_datatable() {
    if (this.dataTable_appointments) {
      this.dataTable_appointments.destroy();
    }
  }

  getAppointments(email) {
    this.appointmentService.get_patient_appointments(email).subscribe(res => {
      if (res.status) {
        this.appointments = res.appointments;
        this.appointment_count = res.count;
        setTimeout(() => {
          // for slots table tab
          const app: any = $("#app_datatable");
          this.dataTable_appointments = app.DataTable({
            searching: true,
            paging: true,
            info: true,
            columnDefs: [
              {
                orderable: false,
                targets: "no-sort"
              }
            ]
          });
        }, 0);
      }
    });
  }

  getTime(time) {
    return this.moment.getTime(time);
  }
}
