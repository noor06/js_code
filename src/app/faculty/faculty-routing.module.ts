import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FacultyComponent } from "./faculty.component";
import { FacultyDashboardComponent } from "./faculty-dashboard/faculty-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: FacultyComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      {
        path: "dashboard",
        component: FacultyDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule {}
