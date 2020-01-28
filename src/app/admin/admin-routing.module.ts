import { RequestsComponent } from "./requests/requests.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddHospitalComponent } from "./add-hospital/add-hospital.component";
import { AdminComponent } from "./admin.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { ManageSlotsComponent } from "./manage-slots/manage-slots.component";
import { AddDoctorFormComponent } from "../shared/add-doctor-form/add-doctor-form.component";
import { AdminDoctorProfileComponent } from "./admin-doctor-profile/admin-doctor-profile.component";
import { AdminDoctorsComponent } from "./admin-doctors/admin-doctors.component";
import { AdminAppointmentComponent } from "./admin-appointment/admin-appointment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotificationComponent } from "../shared/notification/notification.component";
import { EditHospitalComponent } from "./edit-hospital/edit-hospital.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { AdminPatientsComponent } from "./admin-patients/admin-patients.component";
import { PatientProfileComponent } from "../shared/patient-profile/patient-profile.component";
import { ManagePatientsComponent } from "../shared/manage-patients/manage-patients.component";
import { ManageDepartmentsComponent } from "../shared/manage-departments/manage-departments.component";
import { PainTypeComponent } from './pain-type/pain-type.component';
import { AddPainComponent } from './add-pain/add-pain.component';
import { EditPainComponent } from './edit-pain/edit-pain.component';
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "hospital",
        component: HospitalsComponent
      },

      {
        path: "hospital/add",
        component: AddHospitalComponent
      },
      {
        path: "hospital/:hospital_id",
        component: EditHospitalComponent
      },
      {
        path: "doctor",
        component: AdminDoctorsComponent
      },
      {
        path: "appointment",
        component: AdminAppointmentComponent
      },
      {
        path: "department",
        component: ManageDepartmentsComponent
      },
      {
        path: "doctor/:hospital_id/add",
        component: AddDoctorFormComponent
      },
      {
        path: "patient/:patient_id",
        component: PatientProfileComponent
      },
      {
        path: "hospital/:hospital_id/doctor/:doctor_id",
        component: AdminDoctorProfileComponent
      },
      {
        path: "slot",
        component: ManageSlotsComponent
      },
      {
        path: "patient",
        component: ManagePatientsComponent
      },
      {
        path: "account",
        component: UpdateProfileComponent
      },
      {
        path: "updates",
        component: NotificationComponent
      },
      {
        path: "request",
        component: RequestsComponent
      },
        {
        path: "pain-type",
        component: PainTypeComponent
      },
      {
        path: "pain/add",
        component: AddPainComponent
      },
      {
        path: "pain/:pain_id",
        component: EditPainComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
