import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./external/login/login.component";
import { PageNotFoundComponent } from "./external/page-not-found/page-not-found.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { AdminAuthGuardService as AdminAuth } from "./services/admin-auth-guard.service";
import { ClinicAuthGuardService as ClinicAuth } from "./services/clinic-auth-guard.service";
import { FacultyAuthGuardService as FacultyAuth } from "./services/faculty-auth-guard.service";
import { AdminLoginComponent } from "./external/admin-login/admin-login.component";
import { ResetPasswordComponent } from "./external/reset-password/reset-password.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "admin/login", component: AdminLoginComponent },
  { path: "password/reset/:token", component: ResetPasswordComponent },
  {
    path: "admin",
    canActivate: [AdminAuth],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "clinic",
    canActivate: [ClinicAuth],
    loadChildren: () =>
      import("./clinic/clinic.module").then(m => m.ClinicModule)
  },
  {
    path: "faculty",
    canActivate: [FacultyAuth],
    loadChildren: () =>
      import("./faculty/faculty.module").then(m => m.FacultyModule)
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
