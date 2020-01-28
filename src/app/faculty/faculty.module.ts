import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FacultyRoutingModule } from "./faculty-routing.module";
import { FacultyDashboardComponent } from "./faculty-dashboard/faculty-dashboard.component";
import { FacultyComponent } from "./faculty.component";
import { FacultyNavbarComponent } from './faculty-navbar/faculty-navbar.component';

@NgModule({
  declarations: [FacultyDashboardComponent, FacultyComponent, FacultyNavbarComponent],
  imports: [CommonModule, FacultyRoutingModule]
})
export class FacultyModule {}
