import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AddHospitalComponent } from "./add-hospital/add-hospital.component";
import { AdminComponent } from "./admin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { ManageSlotsComponent } from "./manage-slots/manage-slots.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { ModalModule } from "ngx-bootstrap/modal";
import { AddSlotFormComponent } from "./add-slot-form/add-slot-form.component";
import { ClickOutsideModule } from "ng4-click-outside";
import { AdminService } from "../services/admin.service";
import { SharedModule } from "../shared/shared.module";
import { McBreadcrumbsModule } from "ngx-breadcrumbs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { IntlInputPhoneModule } from "intl-input-phone";
import { DepartmentService } from "../services/department.service";
import { AdminDoctorProfileComponent } from "./admin-doctor-profile/admin-doctor-profile.component";
import { AgmCoreModule } from "@agm/core";
import { AdminDoctorsComponent } from "./admin-doctors/admin-doctors.component";
import { AdminAppointmentComponent } from "./admin-appointment/admin-appointment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartsModule } from "ng2-charts";
import { LightboxModule } from "ngx-lightbox";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { EditHospitalComponent } from "./edit-hospital/edit-hospital.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { AdminPatientsComponent } from "./admin-patients/admin-patients.component";
import { RequestsComponent } from "./requests/requests.component";
import { RequestDetailComponent } from "./request-detail/request-detail.component";
import {  PainTypeComponent } from "./pain-type/pain-type.component";
import { AddPainComponent } from './add-pain/add-pain.component';
import { EditPainComponent } from './edit-pain/edit-pain.component';
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    PainTypeComponent,
    EditPainComponent,
    AddPainComponent,
    AddHospitalComponent,
    AdminComponent,
    HospitalsComponent,
    AdminDoctorProfileComponent,
    ManageSlotsComponent,
    AdminDoctorsComponent,
    AdminAppointmentComponent,
    AddSlotFormComponent,
    DashboardComponent,
    EditHospitalComponent,
    UpdateProfileComponent,
    AdminPatientsComponent,
    RequestsComponent,
    RequestDetailComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDURY1Pw5y-NxzrbNzp98hD_h0WWoKN8sI",
      libraries: ["places"]
    }),
    BsDropdownModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    IntlInputPhoneModule,
    PaginationModule.forRoot(),
    McBreadcrumbsModule.forRoot(),
    LightboxModule,
    ModalModule.forRoot(),
    CommonModule,
    ChartsModule,
    ClickOutsideModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    AmazingTimePickerModule
  ],
  exports: [AddSlotFormComponent],
  providers: [AdminService, DepartmentService]
})
export class AdminModule {}
