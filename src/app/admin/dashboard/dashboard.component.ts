import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { AppointmentService } from "src/app/services/appointment.service";
import * as moment from "moment";
import { CommonService } from "src/app/services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  hospital_count;
  patient_count;
  appointment_count;
  doctor_count;
  cancelled_count;
  active_count;
  completed_count;

  bar_loading;
  pie_loading;

  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: number[];

  pieChartType: ChartType;
  pieChartLegend;

  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "#28a745",
        "#dc3545",
        "#17a2b8"
      ]
    }
  ];

  // bar chart configuration
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [
        {
          //   display: true,
          //   scaleLabel: {
          //     display: true,
          //     labelString: "Months"
          //   }
        }
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];

  constructor(
    private adminService: AdminService,
    private appointmentService: AppointmentService,
    private common: CommonService,
    private router: Router
  ) {}

  // charts events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  ngOnInit() {
    this.bar_loading = true;
    this.appointmentService.get_stats().subscribe(res => {
      if (res.status === "200") {
        // const data_temp = {
        //   status: "200",
        //   data: [
        //     {
        //       data: [10, 32, 12, 15],
        //       label: "completed"
        //     },
        //     {
        //       data: [23, 25, 11, 0],
        //       label: "cancelled"
        //     }
        //   ],
        //   months: ["September", "October", "November", "December"]
        // };
        // this.barChartLabels = data_temp.months;
        this.barChartLabels = res.months;
        this.barChartData = res.data;
        // this.barChartData = data_temp.data;
        this.bar_loading = false;
      }
    });

    this.adminService.get_count().subscribe(res => {
      this.pie_loading = true;
      if (res.status) {
        this.hospital_count = res.hospital_count;
        this.doctor_count = res.doctor_count;
        this.patient_count = res.patient_count;
        this.cancelled_count = res.cancelled_appointment_count;
        this.completed_count = res.completed_appointment_count;
        this.active_count = res.active_appointment_count;

        // Pie
        this.pieChartOptions = {
          responsive: true,
          legend: {
            position: "top"
          },
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                const label = ctx.chart.data.labels[ctx.dataIndex];
                return label;
              }
            }
          }
        };
        this.pieChartLabels = ["Completed", "Cancelled", "Active"];
        this.pieChartData = [
          this.completed_count,
          this.cancelled_count,
          this.active_count
        ];
        this.pieChartType = "pie";
        this.pieChartLegend = true;
      }
      this.pie_loading = false;
    });
  }

  navigate_heading(type) {
    if (type === "appointment") {
      this.router.navigateByUrl("/admin/appointment");
      this.nav_heading("Appointment");
    } else if (type === "patient") {
      this.router.navigateByUrl("/admin/patient");
      this.nav_heading("Patient");
    } else if (type === "doctor") {
      this.router.navigateByUrl("/admin/doctor");
      this.nav_heading("Doctor");
    } else if (type === "hospital") {
      this.router.navigateByUrl("/admin/hospital");
      this.nav_heading("Hospital");
    }
  }

  nav_heading(heading) {
    this.common.nav_heading_Observable(heading);
  }

  //   public chartClicked(e: any): void {
  //     console.log(e);
  //   }
  //   public chartHovered(e: any): void {
  //     console.log(e);
  //   }
}
