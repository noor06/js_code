import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import * as moment from "moment";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import { SlotService } from "src/app/services/slot.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-manage-slots",
  templateUrl: "./manage-slots.component.html",
  styleUrls: ["./manage-slots.component.css"]
})
export class ManageSlotsComponent implements OnInit {
  minDate: Date;
  hospitals = [];
  doctors = [];
  selected_hospital;
  selected_doctor;
  hospital_flag = false;
  doctor_flag = false;
  all_check_flag = false;
  loading = false;
  slots = [];

  days = [0, 1, 2, 3, 4, 5, 6];
  disabled_days = [];

  doctor_id = "";
  hospital_id = "";

  dataTable_slots: any;
  modalRef: BsModalRef;
  item_check = false;

  date;

  date_showing_slots;

  closed_slots_flag = false;
  checked_count;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private slotService: SlotService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private common: CommonService
  ) {
    this.date = new Date();
  }

  ngOnInit() {
    this.getHospitals();
  }

  open() {}

  getTime(timeString) {
    return moment(timeString, "HH:mm A");
  }

  open_add_slot_form(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  select_hospital(e) {
    this.hospital_flag = false;
    this.doctor_flag = false;
    if (e.target.value !== "") {
      const selected_id = e.target.value;
      this.hospital_id = e.target.value;
      this.getDoctors(selected_id);
      this.hospitalService.get_hospital(selected_id).subscribe(response => {
        if (this.dataTable_slots) {
          this.dataTable_slots.destroy();
        }
        // this.doctor_flag = false;
        this.hospital_flag = true;
        this.selected_hospital = response.hospital;
      });
    } else {
      this.hospital_flag = false;
      this.doctor_flag = false;
    }
  }

  select_doctor(e) {
    this.doctor_flag = false;
    if (e.target.value !== "") {
      this.doctor_id = e.target.value;
      if (this.dataTable_slots) {
        this.dataTable_slots.destroy();
      }
      this.getDoctor(e.target.value);
      this.getSlots(e.target.value, this.date);
      this.date_showing_slots = moment(this.date).format("YYYY-MM-DD");
    } else {
      this.doctor_flag = false;
    }
  }

  getDoctors(id) {
    this.doctorService.get_doctors_by_hospital(id).subscribe(response => {
      this.doctors = response.list;
    });
  }

  getDoctor(id) {
    this.doctorService.get_doctor_by_id(id).subscribe(response => {
      this.doctor_flag = true;
      this.selected_doctor = response.doctor;
      var temp1 = [];
      const temp = JSON.parse(this.selected_doctor.working_days);
      temp.forEach((item, i) => {
        if (item === "Sun") {
          temp1.push(0);
        } else if (item === "Mon") {
          temp1.push(1);
        } else if (item === "Tue") {
          temp1.push(2);
        } else if (item === "Wed") {
          temp1.push(3);
        } else if (item === "Thu") {
          temp1.push(4);
        } else if (item === "Fri") {
          temp1.push(5);
        } else if (item === "Sat") {
          temp1.push(6);
        }
      });

      this.days.forEach(e => {
        if (!temp1.includes(e)) {
          this.disabled_days.push(e);
        }
      });
    });
  }

  date_selected() {
    if (moment(this.date).format("YYYY-MM-DD") !== this.date_showing_slots) {
      if (this.dataTable_slots) {
        this.dataTable_slots.destroy();
      }
      this.getSlots(
        this.selected_doctor.id,
        moment(this.date).format("YYYY-MM-DD")
      );
      this.date_showing_slots = moment(this.date).format("YYYY-MM-DD");
    }
  }

  getSlots(id, date) {
    this.slots = [];
    this.all_check_flag = false;
    this.slotService
      .get_slot_list_by_doctorID(id, moment(date).format("YYYY-MM-DD"))
      .subscribe(response => {
        this.slots = response.slots;
        this.slots.forEach((item, i) => {
          this.slots[i].isChecked = false;
          if (this.slots[i].status === "0") {
            this.closed_slots_flag = true;
          }
        });
        setTimeout(() => {
          // for slots table tab
          const slot: any = $("#slots");
          this.dataTable_slots = slot.DataTable({
            columnDefs: [
              {
                orderable: false,
                targets: "no-sort"
              }
            ]
          });
        }, 0);
        this.doctor_flag = true;
      });
  }

  check(id, isChecked) {
    if (isChecked === false) {
      var all_check_count = 0;
      this.slots.map((item, i) => {
        if (this.slots[i].id === id) {
          this.slots[i].isChecked = true;
        }
        if (this.slots[i].isChecked === true && this.slots[i].status !== "3") {
          all_check_count = all_check_count + 1;
        }
      });

      var new_array = this.slots.filter((item, i) => {
        return item.status !== "3";
      });

      if (all_check_count === new_array.length) {
        this.all_check_flag = true;
      }
    } else {
      this.slots.map((item, i) => {
        if (this.slots[i].id === id) {
          this.slots[i].isChecked = false;
        }
        if (this.slots[i].isChecked === true && this.slots[i].status !== "3") {
          all_check_count = all_check_count + 1;
        }
      });
      var new_array = this.slots.filter((item, i) => {
        return item.status !== "3";
      });

      if (all_check_count !== new_array.length) {
        this.all_check_flag = false;
      }
    }

    this.checked_count = 0;
    this.slots.forEach((item, i) => {
      if (this.slots[i].isChecked === true) {
        this.checked_count = this.checked_count + 1;
      }
    });
  }

  checkAll() {
    if (this.all_check_flag) {
      this.slots.map((item, i) => {
        if (item.status !== "3") {
          this.slots[i].isChecked = true;
        }
      });
    } else {
      this.slots.map((item, i) => {
        this.slots[i].isChecked = false;
      });
    }

    this.checked_count = 0;
    this.slots.forEach((item, i) => {
      if (this.slots[i].isChecked === true) {
        this.checked_count = this.checked_count + 1;
      }
    });
  }

  updateSlot(id, operation) {
    var slot;
    if (operation === "resume") {
      slot = {
        id,
        operation
      };
    } else if (operation === "close") {
      slot = { id, operation };
    } else if (operation === "suspend") {
      slot = { id, operation };
    }

    this.slotService.update_slot_by_ID(slot).subscribe(response => {
      if (response.status) {
        this.toastr.success(response.message);
        this.dataTable_slots.destroy();
        this.getSlots(
          this.selected_doctor.id,
          moment(this.date).format("YYYY-MM-DD")
        );
      }
    });
  }

  delete(operation) {
    if (operation === "checked") {
      Swal.fire({
        title: `Deleting selected slots...`,
        text: "Are you sure ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes sure"
      }).then(result => {
        if (result.value) {
          this.loading = true;
          var slot_array = [];
          this.slots.map((item, i) => {
            if (this.slots[i].isChecked) {
              slot_array.push(item.id);
            }
          });

          this.slotService
            .delete({ operation: "checked", slots: slot_array })
            .subscribe(res => {
              if (res.status === true) {
                this.loading = false;
                this.all_check_flag = false;
                this.dataTable_slots.destroy();
                this.getSlots(
                  this.selected_doctor.id,
                  moment(this.date).format("YYYY-MM-DD")
                );
                this.toastr.success(res.message);
                console.log(this.hospital_id, this.doctor_id);
              }
            });
        }
      });
    } else if (operation === "closed") {
      Swal.fire({
        title: `Deleting closed slots...`,
        text: "Are you sure ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes sure"
      }).then(result => {
        if (result.value) {
          this.loading = true;
          this.slotService
            .delete({
              operation: "closed",
              date: this.date,
              doctorId: this.selected_doctor.id
            })
            .subscribe(res => {
              if (res.status === true) {
                this.loading = false;
                this.all_check_flag = false;
                this.dataTable_slots.destroy();
                this.getSlots(
                  this.selected_doctor.id,
                  moment(this.date).format("YYYY-MM-DD")
                );
                this.toastr.success(res.message);
              }
            });
        }
      });
    } else if (operation === "all") {
      Swal.fire({
        title: `Deleting all slots...`,
        text: "Are you sure ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes sure"
      }).then(result => {
        if (result.value) {
          this.loading = true;
          this.slotService
            .delete({
              operation: "all",
              doctorId: this.selected_doctor.id,
              date: moment(this.date_showing_slots).format("YYYY-MM-DD")
            })
            .subscribe(res => {
              if (res.status === true) {
                this.loading = false;
                this.all_check_flag = false;
                this.dataTable_slots.destroy();
                this.getSlots(
                  this.selected_doctor.id,
                  moment(this.date).format("YYYY-MM-DD")
                );
                this.toastr.success(res.message);
              }
            });
        }
      });
    }
  }

  getHospitals() {
    this.hospitalService.get_hospitals().subscribe(response => {
      this.hospitals = response.list;
    });
  }

  getDay(date_string) {
    return moment(new Date(date_string)).format("dddd");
  }

  slot_added() {
    if (this.dataTable_slots) {
      this.dataTable_slots.destroy();
    }
    this.getSlots(
      this.selected_doctor.id,
      moment(this.date).format("YYYY-MM-DD")
    );
  }

  refreshSlots() {
    if (this.dataTable_slots) {
      this.dataTable_slots.destroy();
    }
    this.getSlots(
      this.selected_doctor.id,
      moment(this.date).format("YYYY-MM-DD")
    );
  }

  delete_Slot(id) {
    Swal.fire({
      title: `Deleting slot...`,
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      if (result.value) {
        this.slotService.delete_slot_by_ID(id).subscribe(response => {
          if (response.status) {
            this.toastr.success(response.message);
            this.dataTable_slots.destroy();
            this.getSlots(
              this.selected_doctor.id,
              moment(this.date).format("YYYY-MM-DD")
            );
          }
        });
      }
    });
  }
}
