import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-clinic-dashboard",
  templateUrl: "./clinic-dashboard.component.html",
  styleUrls: ["./clinic-dashboard.component.css"]
})
export class ClinicDashboardComponent implements OnInit {
  doctor_count;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit() {
    this.getCounts(localStorage.getItem("hospital"));
  }

  getCounts(id) {
    this.hospitalService.get_count(id).subscribe(res => {
      this.doctor_count = res.doctor_count;
    });
  }
}
