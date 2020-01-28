import { PatientHospitalComponent } from "./patient-hospital/patient-hospital.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PatientComponent } from "./patient.component";
import { PatientHospitalsComponent } from "./patient-hospitals/patient-hospitals.component";
import { ManageAppointmentsComponent } from "./manage-appointments/manage-appointments.component";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";

const routes: Routes = [
  {
    path: "",
    component: PatientComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "hospital" },
      {
        path: "hospital",
        component: PatientHospitalsComponent,
        data: {
          title: "Hospitals",
          breadcrumb: [
            {
              label: "Hospitals",
              url: "hospital"
            }
          ]
        }
      },
      {
        path: "account/:patient_id",
        component: AccountSettingComponent,
        data: {
          title: "accounts",
          breadcrumb: [
            {
              label: "My account",
              url: "account/:patient_id"
            }
          ]
        }
      },
      {
        path: "hospital/:hospital_id",
        component: PatientHospitalComponent,
        data: {
          title: "hospital",
          breadcrumb: [
            {
              label: "Hospitals",
              url: "hospital"
            },
            {
              label: "{{hospital_data}}",
              url: "hospital/:hospital_id"
            }
          ]
        }
      },
      {
        path: "hospital/:hospital_id/doctor/:doctor_id",
        component: DoctorProfileComponent,
        data: {
          title: "doctor",
          breadcrumb: [
            {
              label: "Hospitals",
              url: "hospital"
            },
            {
              label: "{{hospital_data}}",
              url: "hospital/:hospital_id"
            },
            {
              label: "{{doctor_data}}",
              url: "hospital/:hospital_id/doctor/:doctor_id"
            }
          ]
        }
      },
      {
        path: "appointment",
        component: ManageAppointmentsComponent,
        data: {
          title: "appointments",
          breadcrumb: [
            {
              label: "My Appointments",
              url: "appointment"
            }
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
