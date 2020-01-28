import { Validators } from "@angular/forms";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AmazingTimePickerService } from "amazing-time-picker";
import { ToastrService } from "ngx-toastr";
import { SlotService } from "src/app/services/slot.service";

@Component({
  selector: "app-clinic_add_slot",
  templateUrl: "./clinic_add_slot.component.html",
  styleUrls: ["./clinic_add_slot.component.css"]
})
export class Clinic_add_slotComponent implements OnInit {
  minDate: Date;

  public slot_form: FormGroup;

  @Input() modalRef: BsModalRef;
  @Input() selected_doctor: any;

  @Output() callBack = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    private slotService: SlotService,
    private toastr: ToastrService
  ) {
    this.minDate = new Date();

    this.slot_form = this.fb.group({
      date: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
      room: [""],
      floor: [""]
    });
  }

  ngOnInit() {
    console.log(this.selected_doctor);
  }

  open() {}

  add_slot() {
    var slot = {
      doctorId: this.selected_doctor.id,
      date: this.slot_form.controls["date"].value.toString(),
      from: this.slot_form.controls["from"].value,
      to: this.slot_form.controls["to"].value,
      room: this.slot_form.controls["room"].value,
      floor: this.slot_form.controls["floor"].value,
      isAvailable: true
    };
    this.slotService.add_slot(slot).subscribe(response => {
      if (response.status) {
        this.toastr.success(response.message);
        this.modalRef.hide();
        this.callBack.emit();
      }
    });
  }
}
