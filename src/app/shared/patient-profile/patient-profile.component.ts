import { API_URL } from "./../../shared_config";
import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { PatientService } from "src/app/services/patient.service";
import * as $ from "jquery";

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.css"]
})
export class PatientProfileComponent implements OnInit {
  appointments;
  patient;
  patientId;
  loading = false;
  appointment_datatable;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      //   console.log("====> route params: ", res);
      this.patientId = res.patient_id;
      if (this.appointment_datatable) {
        this.appointment_datatable.destroy();
      }
      this.getPatientAppointments(this.patientId);
      this.getPatient(this.patientId);
    });
  }

  getPatientAppointments(id) {
    this.appointments = [];
    this.appointmentService.get_patient_appointments(id).subscribe(res => {
      if (res.status === true) {
        this.appointments = res.appointments;
        setTimeout(() => {
          // for slots table tab
          const appointments: any = $("#appointment_table");
          this.appointment_datatable = appointments.DataTable({
            searching: true,
            responsive: true,
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

  getAge(date) {
    const age = moment().diff(new Date(date), "years", false);
    return age;
  }

  getTime(time) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }

  getPatient(id) {
    this.loading = true;
    this.patientService.getPatientById(id).subscribe(res => {
      if (res.status === true) {
        this.loading = true;
        this.patient = res.patient;
        this.patient.profile_pic =
          this.patient.profile_pic && `${API_URL}/${this.patient.profile_pic}`;
        // console.log(this.patient);
      }
    });
  }
}
