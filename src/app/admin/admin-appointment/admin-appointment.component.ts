import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { DoctorService } from "src/app/services/doctor.service";
import { AppointmentService } from "src/app/services/appointment.service";
import * as $ from "jquery";
import * as moment from "moment";
import { SlotService } from "src/app/services/slot.service";

@Component({
  selector: "app-admin-appointment",
  templateUrl: "./admin-appointment.component.html",
  styleUrls: ["./admin-appointment.component.css"]
})
export class AdminAppointmentComponent implements OnInit {
  hospitalId = "";
  doctorId = "";
  hospitals;
  doctors;
  appointments;
  app_flag = false;
  loading = false;
  hospital_flag = false;

  appointment_datatable: any;

  constructor(
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private app_service: AppointmentService,
    private slotService: SlotService
  ) {}

  ngOnInit() {
    this.gethospitals();
  }

  select_hospital(e) {
    this.hospital_flag = false;
    this.app_flag = false;
    this.getDoctors(this.hospitalId);
  }

  gethospitals() {
    this.hospitalService.get_hospitals().subscribe(res => {
      if (res.status) {
        this.hospitals = res.list;
      }
    });
  }

  getDoctors(h_id) {
    this.doctorId = "";
    this.doctors = [];
    this.doctorService.get_doctors_by_hospital(h_id).subscribe(res => {
      if (res.status) {
        this.hospital_flag = true;
        this.app_flag = false;
        this.doctors = res.list;
      }
    });
  }

  async getSlot(id) {
    const slot = await this.slotService.getSlotDetails(id).toPromise();
    return slot;
  }

  getDoctor(id) {
    var name;
    this.doctors.forEach((item, i) => {
      if (item.id === id) {
        name = item.name;
      }
    });
    return name;
  }

  select_doctor(e) {
    this.app_flag = false;
    if (this.appointment_datatable) {
      this.appointment_datatable.destroy();
    }
    this.getAppointments(this.doctorId);
  }

  getDay(dateString) {
    return moment(dateString).format("dddd");
  }

  getTime(time) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }

  getAppointments(doc_id) {
    this.loading = true;
    this.app_service.get_doctor_appointments(doc_id).subscribe(res => {
      if (res.status) {
        this.app_flag = true;
        this.appointments = res.appointments;

        setTimeout(() => {
          // for app table tab
          const appointments: any = $("#appointment_datatable");
          this.appointment_datatable = appointments.DataTable({
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
        this.loading = false;
      }
    });
  }
}
