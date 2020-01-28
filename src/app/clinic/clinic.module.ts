import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClinicRoutingModule } from "./clinic-routing.module";
import { ClinicDoctorsComponent } from "./clinic-doctors/clinic-doctors.component";
import { ClinicSlotsComponent } from "./clinic-slots/clinic-slots.component";
import { ClinicSidebarComponent } from "./clinic-sidebar/clinic-sidebar.component";
import { ClinicComponent } from "./clinic.component";
import { ClinicService } from "../services/clinic.service";
import { ClinicNavbarComponent } from "./clinic-navbar/clinic-navbar.component";
import { Clinic_add_slotComponent } from "./clinic_add_slot/clinic_add_slot.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from "ngx-pagination";
import { LightboxModule } from "ngx-lightbox";
import { SharedModule } from "../shared/shared.module";
import { ClinicDashboardComponent } from "./clinic-dashboard/clinic-dashboard.component";
import { AdminModule } from "../admin/admin.module";
import { ClinicAppointmentsComponent } from './clinic-appointments/clinic-appointments.component';
import { ClinicDepartmentsComponent } from './clinic-departments/clinic-departments.component';

@NgModule({
  declarations: [
    ClinicDoctorsComponent,
    ClinicSlotsComponent,
    ClinicSidebarComponent,
    ClinicComponent,
    ClinicNavbarComponent,
    Clinic_add_slotComponent,
    ClinicDashboardComponent,
    ClinicAppointmentsComponent,
    ClinicDepartmentsComponent
  ],
  imports: [
    AmazingTimePickerModule,
    LightboxModule,
    BsDatepickerModule,
    BsDropdownModule,
    NgxPaginationModule,
    CommonModule,
    ClinicRoutingModule,
    FormsModule,
    SharedModule,
    AdminModule,
    ReactiveFormsModule
  ],
  providers: [ClinicService]
})
export class ClinicModule {}
