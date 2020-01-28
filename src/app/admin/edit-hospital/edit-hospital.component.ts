import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { google } from "@google/maps";
import { MapsAPILoader } from "@agm/core";
import * as moment from "moment";
import {
  EMAIL_REGEX,
  white_space_regex,
  must_alphanumeric_regex,
  digit_regex
} from "../../shared_config";
import { ToastrService } from "ngx-toastr";

declare var google: any;

@Component({
  selector: "app-edit-hospital",
  templateUrl: "./edit-hospital.component.html",
  styleUrls: ["./edit-hospital.component.css"]
})
export class EditHospitalComponent implements OnInit {
  hospitalId;
  hospital;
  basicEdit = false;
  contactEdit = false;
  timingEdit = false;
  overviewEdit = false;

  zoom;
  lat;
  lng;

  @ViewChild("search", null) public searchElementRef: ElementRef;

  public basic_info_form: FormGroup;
  public contact_info_form: FormGroup;
  public timing_info_form: FormGroup;

  constructor(
    private hospitalService: HospitalService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.basic_info_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      address: ["", Validators.required],
      country: [],
      state: [],
      city: [],
      landmark: [],
      pincode: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(digit_regex)
        ])
      ]
    });

    this.contact_info_form = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ])
      ],
      appointment_number: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ],

      emergency_number: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ],
      phone: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ]
    });

    this.timing_info_form = this.fb.group({
      start: ["12:00", Validators.required],
      end: ["12:00", Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.hospitalId = res.hospital_id;
      this.getHospital(this.hospitalId);
    });
    this.loadGoogleMaps();
  }

  open() {}

  getHospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status === true) {
        this.hospital = res.hospital;
      }
    });
  }

  loadGoogleMaps() {
    //set google maps defaults
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const address = place.address_components;

          this.basic_info_form.controls["address"].patchValue(
            place.formatted_address
          );

          address.forEach(item => {
            if (item.types[0] === "country") {
              this.basic_info_form.controls["country"].patchValue(
                item.long_name
              );
            }
            if (item.types[0] === "administrative_area_level_1") {
              this.basic_info_form.controls["state"].patchValue(item.long_name);
            }
            if (item.types[0] === "administrative_area_level_2") {
              this.basic_info_form.controls["city"].patchValue(item.long_name);
            }
          });

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            alert("please select valid location");
            return false;
          } else {
            //set lat, lng and zoom
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 12;

            console.log("location: ", this.lat, this.lng);
          }
        });
      });
    });
  }

  validateTimeShift(start, end) {
    const flag = moment(`${start}:00`, "HH:mm:ss").isSameOrBefore(
      moment(`${end}:00`, "HH:mm:ss")
    );

    if (!flag) {
      this.toastr.error("Please select valid timings");
    }
    return flag;
  }

  editClicked(type) {
    if (type === "basic") {
      this.basicEdit = true;
      this.loadGoogleMaps();
      //   this.basic_info_form.controls["address"].patchValue(
      //     this.hospital.address
      //   );
      this.lat = this.hospital.lat;
      this.lng = this.hospital.lng;
      this.zoom = 12;
      this.basic_info_form.controls["name"].patchValue(this.hospital.name);
      this.basic_info_form.controls["landmark"].patchValue(
        this.hospital.landmark
      );

      this.basic_info_form.controls["pincode"].patchValue(
        this.hospital.pincode
      );
      this.basic_info_form.controls["address"].patchValue(
        this.hospital.address
      );
      this.basic_info_form.controls["country"].patchValue(
        this.hospital.country
      );
      this.basic_info_form.controls["city"].patchValue(this.hospital.city);
      this.basic_info_form.controls["state"].patchValue(this.hospital.state);
    } else if (type === "contact") {
      this.contactEdit = true;
      this.contact_info_form.controls["email"].patchValue(this.hospital.email);
      this.contact_info_form.controls["phone"].patchValue(
        this.hospital.phone.substring(3, 17)
      );

      this.contact_info_form.controls["emergency_number"].patchValue(
        this.hospital.emergency_number.substring(3, 17)
      );
      this.contact_info_form.controls["appointment_number"].patchValue(
        this.hospital.appointment_number.substring(3, 17)
      );
    } else if (type === "timing") {
      this.timingEdit = true;

      this.timing_info_form.controls["start"].patchValue(
        this.hospital.timing_from
      );
      this.timing_info_form.controls["end"].patchValue(this.hospital.timing_to);
    } else if (type === "overview") {
      this.overviewEdit = true;
    }
  }

  cancelEdit(type) {
    if (type === "basic") {
      this.basicEdit = false;
      this.basic_info_form.controls["name"].patchValue(this.hospital.name);
      this.basic_info_form.controls["address"].patchValue(
        this.hospital.address
      );
      this.basic_info_form.controls["pincode"].patchValue(
        this.hospital.pincode
      );
      this.basic_info_form.controls["landmark"].patchValue(
        this.hospital.landmark
      );
    } else if (type === "contact") {
      this.contactEdit = false;
      this.contact_info_form.controls["email"].patchValue(this.hospital.email);
      this.contact_info_form.controls["phone"].patchValue(this.hospital.phone);

      this.contact_info_form.controls["emergency_number"].patchValue(
        this.hospital.emergency_number
      );
      this.contact_info_form.controls["appointment_number"].patchValue(
        this.hospital.appointment_number
      );
    } else if (type === "timing") {
      this.timingEdit = false;
      this.timing_info_form.controls["start"].patchValue(
        this.hospital.timing_from
      );
      this.timing_info_form.controls["end"].patchValue(this.hospital.timing_to);
    } else if (type === "overview") {
      this.overviewEdit = false;
    }
  }

  saveBasicInfo() {
    if (this.basic_info_form.valid) {
      const formData = new FormData();
      formData.append("id", this.hospital.id);
      formData.append("name", this.basic_info_form.controls["name"].value);
      formData.append(
        "landmark",
        this.basic_info_form.controls["landmark"].value
      );
      formData.append(
        "pincode",
        this.basic_info_form.controls["pincode"].value
      );
      formData.append(
        "address",
        this.basic_info_form.controls["address"].value
      );

      this.hospitalService.editHospital(formData).subscribe(res => {
        if (res.status === "200") {
          this.getHospital(this.hospitalId);
          this.cancelEdit("basic");
        }
      });
    } else {
      Object.keys(this.basic_info_form.controls).forEach(key => {
        this.basic_info_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  saveContactInfo() {
    if (this.contact_info_form.valid) {
      const formData = new FormData();
      formData.append("id", this.hospital.id);
      formData.append("email", this.contact_info_form.controls["email"].value);
      formData.append(
        "phone",
        `+1 ${this.contact_info_form.controls["phone"].value}`
      );
      formData.append(
        "appointment_number",
        `+1 ${this.contact_info_form.controls["appointment_number"].value}`
      );
      formData.append(
        "emergency_number",
        `+1 ${this.contact_info_form.controls["emergency_number"].value}`
      );

      this.hospitalService.editHospital(formData).subscribe(res => {
        if (res.status === "200") {
          this.getHospital(this.hospitalId);
          this.cancelEdit("contact");
        }
      });
    } else {
      Object.keys(this.contact_info_form.controls).forEach(key => {
        this.contact_info_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  saveTimingInfo() {
    if (
      this.validateTimeShift(
        this.timing_info_form.controls["start"].value,
        this.timing_info_form.controls["end"].value
      )
    ) {
      const formData = new FormData();
      formData.append("id", this.hospital.id);
      formData.append(
        "timing_from",
        this.timing_info_form.controls["start"].value
      );
      formData.append("timing_to", this.timing_info_form.controls["end"].value);

      this.hospitalService.editHospital(formData).subscribe(res => {
        if (res.status === "200") {
          this.getHospital(this.hospitalId);
          this.cancelEdit("timing");
        }
      });
    }
  }

  getTime(time) {
    return moment(`${time}:00`, "HH:mm:ss").format("hh:mm a");
  }
}
