import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClinicComponent } from "./clinic.component";
import { ClinicDoctorsComponent } from "./clinic-doctors/clinic-doctors.component";
import { ClinicSlotsComponent } from "./clinic-slots/clinic-slots.component";
import { AddDoctorFormComponent } from "../shared/add-doctor-form/add-doctor-form.component";
import { ClinicDashboardComponent } from "./clinic-dashboard/clinic-dashboard.component";
import { ClinicDepartmentsComponent } from "./clinic-departments/clinic-departments.component";
import { ClinicAppointmentsComponent } from "./clinic-appointments/clinic-appointments.component";
import { ManagePatientsComponent } from '../shared/manage-patients/manage-patients.component';
import { PatientProfileComponent } from '../shared/patient-profile/patient-profile.component';

const routes: Routes = [
  {
    path: "",
    component: ClinicComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      { path: "dashboard", component: ClinicDashboardComponent },
      { path: "doctor", component: ClinicDoctorsComponent },
      { path: "slot", component: ClinicSlotsComponent },
      { path: "doctor/:hospital_id/add", component: AddDoctorFormComponent },
      { path: "appointment", component: ClinicAppointmentsComponent },
      { path: "department", component: ClinicDepartmentsComponent },
      { path: "patient", component: ManagePatientsComponent },
      { path: "patient/:patient_id", component: PatientProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule {}
