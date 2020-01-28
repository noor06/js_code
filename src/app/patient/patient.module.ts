import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientComponent } from "./patient.component";
import { PatientRoutingModule } from "./patient-routing.module";
import { ManageAppointmentsComponent } from "./manage-appointments/manage-appointments.component";
import { PatientSidebarComponent } from "./patient-sidebar/patient-sidebar.component";
import { PatientNavbarComponent } from "./patient-navbar/patient-navbar.component";
import { PatientHospitalsComponent } from "./patient-hospitals/patient-hospitals.component";
import { PatientHospitalComponent } from "./patient-hospital/patient-hospital.component";
import { PatientAppointmentFormComponent } from "./patient-appointment-form/patient-appointment-form.component";
import { PatientService } from "../services/patient.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HospitalSearchPipe } from "./hospital-search.pipe";
import { SharedModule } from "../shared/shared.module";
import { AppointmentFormComponent } from "./appointment-form/appointment-form.component";
import { MomentService } from "../services/moment.service";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { DepartmentService } from "../services/department.service";

import { IntlInputPhoneModule } from "intl-input-phone";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { AgmCoreModule } from "@agm/core";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxCaptchaModule } from "ngx-captcha";

@NgModule({
  declarations: [
    PatientComponent,

    ManageAppointmentsComponent,
    PatientSidebarComponent,
    PatientNavbarComponent,
    PatientHospitalsComponent,
    PatientHospitalComponent,
    PatientAppointmentFormComponent,
    HospitalSearchPipe,
    AccountSettingComponent,
    AppointmentFormComponent,
    DoctorProfileComponent
  ],
  imports: [
    NgxCaptchaModule,
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDURY1Pw5y-NxzrbNzp98hD_h0WWoKN8sI"
    }),
    CommonModule,
    BsDatepickerModule,
    IntlInputPhoneModule,
    AmazingTimePickerModule,
    PatientRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [PatientService, MomentService, DepartmentService]
})
export class PatientModule {}
