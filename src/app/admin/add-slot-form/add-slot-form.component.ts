import { ToastrService } from "ngx-toastr";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AmazingTimePickerService } from "amazing-time-picker";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SlotService } from "src/app/services/slot.service";
import * as moment from "moment";
import { API_URL } from "../../shared_config";
import { NotificationService } from "src/app/services/notification.service";
import * as _ from "lodash";

@Component({
  selector: "app-add-slot-form",
  templateUrl: "./add-slot-form.component.html",
  styleUrls: ["./add-slot-form.component.css"]
})
export class AddSlotFormComponent implements OnInit {
  public slot_form: FormGroup;
  minDate: Date;
  role;
  form_flag;
  loading = false;

  days = [0, 1, 2, 3, 4, 5, 6];
  disabled_days = [];

  @Input() modalRef: BsModalRef;
  @Input() selected_doctor: any;
  @Output() callBack = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    private slotService: SlotService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {
    this.minDate = new Date();

    this.slot_form = this.fb.group({
      date: ["", Validators.required],
      start_time: ["12:00", Validators.required],
      end_time: ["12:00", Validators.required],
      interval: ["", Validators.required],
      room: [""],
      floor: [""]
    });
  }

  ngOnInit() {
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

    this.slot_form.controls["start_time"].patchValue(
      this.selected_doctor.start_time
    );
    this.slot_form.controls["end_time"].patchValue(
      this.selected_doctor.end_time
    );

    this.selected_doctor.profile_pic_img = !this.selected_doctor.profile_pic
      ? "assets/images/doctor_placeholder.jpeg"
      : `${API_URL}/${this.selected_doctor.profile_pic}`;

    const decodedToken = JSON.parse(
      window.atob(localStorage.getItem("accessToken").split(".")[1])
    );
    this.role = decodedToken.role;
  }

  getTime(time) {
    return moment(`${time}:00`, "hh:mm:ss").format("hh:mm a");
  }

  open() {}

  add_slot() {
    this.loading = true;
    const slot = {
      doctorId: this.selected_doctor.id,
      date: this.slot_form.controls["date"].value.toString(),
      start_time: this.slot_form.controls["start_time"].value,
      end_time: this.slot_form.controls["end_time"].value,
      interval: parseInt(this.slot_form.controls["interval"].value, 10),
      room: this.slot_form.controls["room"].value,
      floor: this.slot_form.controls["floor"].value,
      actual_start_time: this.selected_doctor.start_time,
      actual_end_time: this.selected_doctor.end_time,
      status: "1"
    };
    this.slotService.add_slot(slot).subscribe(response => {
      this.loading = false;
      if (response.status === true) {
        this.toastr.success(response.message);
        const start_time = moment(
          `${this.slot_form.controls["start_time"].value}:00`,
          "HH:mm:ss"
        ).format("hh:mm A");
        const end_time = moment(
          `${this.slot_form.controls["end_time"].value}:00`,
          "HH:mm:ss"
        ).format("hh:mm A");

        var date_of_availability = moment(
          new Date(this.slot_form.controls["date"].value)
        ).format("LL");

        const update_obj = {
          user_responsible: this.selected_doctor.id,
          title: `Dr. ${this.selected_doctor.name}, available for ${date_of_availability}`,
          description: `Timings are ${start_time} - ${end_time}, time per patient will be ${this.slot_form.controls["interval"].value} minutes`,
          image: this.selected_doctor.profile_pic,
          click_action: "",
          type: "adding_slots"
          //   redirect_url: "/slot"
        };

        this.add_update(update_obj);

        const data = {
          added_updates_flag: true
        };
        this.notificationService.updates_count_Observable(data);

        this.modalRef.hide();
        this.callBack.emit();
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  add_update(data) {
    this.notificationService.add_update(data).subscribe(res => {});
  }
}
