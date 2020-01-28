import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AmazingTimePickerService } from "amazing-time-picker";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppointmentService } from "src/app/services/appointment.service";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.css"]
})
export class AppointmentFormComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Input() obj;
  @Output() callBack = new EventEmitter<any>();
  minDate: Date;
  doctorName;
  hospitalName;
  departments;
  department_count = 0;

  public appointment_form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private depService: DepartmentService
  ) {
    this.appointment_form = this.fb.group({
      date: ["", Validators.required],
      time: ["00:00", Validators.required],
      case: ["", Validators.required],
      department: ["", Validators.required]
    });
  }

  open() {}

  ngOnInit() {
    this.minDate = new Date();
    this.getHospital(this.obj.hospitalId);
    this.getDoctor(this.obj.doctorId);
    this.getDepartments(this.obj.hospitalId);
  }

  getDepartments(id) {
    this.depService.getDepartments(id).subscribe(res => {
      if (res.status) {
        this.departments = res.departments;
        this.department_count = res.count;
      }
    });
  }

  getDoctor(id) {
    this.doctorService.get_doctor_by_id(id).subscribe(res => {
      if (res.status) {
        this.doctorName = res.doctor.name;
      }
    });
  }

  getHospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status) {
        this.hospitalName = res.hospital.name;
      }
    });
  }

  add_appointment() {
    const appointment = {
      hospitalId: this.obj.hospitalId,
      doctorId: this.obj.doctorId,
      case: this.appointment_form.controls["case"].value,
      date: this.appointment_form.controls["date"].value,
      department: this.appointment_form.controls["department"].value,
      time: this.appointment_form.controls["time"].value,
      email: localStorage.getItem("loggedPatient"),
      patientId: localStorage.getItem("patientId"),
      doctor: this.doctorName,
      hospital: this.hospitalName
    };

    this.appointmentService.add_appointment(appointment).subscribe(res => {
      if (res.status) {
        this.toastr.success("Appointment scheduled");
        this.modalRef.hide();
        this.callBack.emit();
      }
    });
  }
}
