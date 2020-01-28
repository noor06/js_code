import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AddDoctorFormComponent } from "./add-doctor-form/add-doctor-form.component";
import { DoctorService } from "../services/doctor.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { DepartmentService } from "../services/department.service";
import { IntlInputPhoneModule } from "intl-input-phone";
import { Ng7DynamicBreadcrumbModule } from "ng7-dynamic-breadcrumb";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { FooterComponent } from "./footer/footer.component";
import { NotificationComponent } from "./notification/notification.component";
import { ManagePatientsComponent } from "./manage-patients/manage-patients.component";
import { PhoneMaskDirective } from "./phone-mask.directive";
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';

@NgModule({
  declarations: [
    AddDoctorFormComponent,
    BreadcrumbComponent,
    FooterComponent,
    NotificationComponent,
    PatientProfileComponent,
    PhoneMaskDirective,
    ManagePatientsComponent,
    ManageDepartmentsComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule,
    IntlInputPhoneModule,
    FormsModule,
    AmazingTimePickerModule,
    RouterModule,
    ReactiveFormsModule,
    Ng7DynamicBreadcrumbModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [DoctorService, DepartmentService],
  exports: [
    ManageDepartmentsComponent,
    PhoneMaskDirective,
    AddDoctorFormComponent,
    BreadcrumbComponent,
    FooterComponent,
    PatientProfileComponent
  ]
})
export class SharedModule {}
